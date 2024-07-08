require("isomorphic-fetch")
const { storyblokInit, apiPlugin, useStoryblokApi } = require('@storyblok/react');
const Sync = require('./src/sync');
const getStoryParams = require('./src/getStoryParams');
const stringify = require('json-stringify-safe');
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

exports.sourceNodes = async function ({ actions }, options) {
  const pLimit = (await import('p-limit')).default;
  const { createNode, setPluginStatus } = actions;
  const { plugins, ...apiOptions } = options;
  console.log('apiOptions:', { ...apiOptions });

  storyblokInit({ use: [apiPlugin], apiOptions });
  const client = useStoryblokApi();

  Sync.init({
    createNode,
    setPluginStatus,
    client,
  });

  const space = await Sync.getSpace({ typePrefix: apiOptions.typePrefix });
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();
  console.log(formattedDate);

  const languages = options.languages ? options.languages : space.language_codes;
  languages.push('');

  const limit = pLimit(10); // Increased concurrency limit

  const fetchStories = async (language) => {
    await Sync.getAll('stories', {
      node: 'StoryblokEntry',
      params: getStoryParams(language, options),
      typePrefix: options.typePrefix,
      process: (item) => {
        for (const prop in item.content) {
          if (!item.content.hasOwnProperty(prop) || ['_editable', '_uid'].includes(prop)) {
            continue;
          }
          const objectType = Object.prototype.toString
            .call(item.content[prop])
            .replace('[object ', '')
            .replace(']', '')
            .toLowerCase();

          if (['number', 'boolean', 'string'].indexOf(objectType) === -1) {
            continue;
          }

          const type = prop === 'component' ? '' : '_' + objectType;

          item['field_' + prop + type] = item.content[prop];
        }

        item.content = stringify(item.content);
      },
    });
  };

  console.time('fetchStories');
  await Promise.all(languages.map(language => limit(() => fetchStories(language))));
  console.timeEnd('fetchStories');

  console.time('fetchTags');
  await Sync.getAll('tags', {
    node: 'StoryblokTag',
    params: getStoryParams('', options),
    process: (item) => {
      item.id = item.name;
    },
  });
  console.timeEnd('fetchTags');

  if (options.includeLinks === true) {
    console.time('fetchLinks');
    await Sync.getAll('links', {
      node: 'StoryblokLink',
      params: getStoryParams('', options),
    });
    console.timeEnd('fetchLinks');
  }

  console.time('fetchDatasources');
  const datasources = await Sync.getAll('datasources', {
    node: 'StoryblokDatasource',
    typePrefix: options.typePrefix,
  });
  console.timeEnd('fetchDatasources');

  const fetchDatasourceEntries = async (datasource) => {
    const datasourceSlug = datasource.slug;

    const fetchAllEntries = async () => {
      await Sync.getAll('datasource_entries', {
        node: 'StoryblokDatasourceEntry',
        typePrefix: options.typePrefix,
        params: {
          datasource: datasourceSlug,
        },
        process: (item) => {
          item.data_source_dimension = null;
          item.data_source = datasourceSlug;
        },
      });

      const datasourceDimensions = datasource.dimensions || [];

      await Promise.all(datasourceDimensions.map(dimension =>
          Sync.getAll('datasource_entries', {
              node: 'StoryblokDatasourceEntry',
              typePrefix: options.typePrefix,
              params: {
                  datasource: datasourceSlug,
                  dimension: dimension.entry_value,
              },
              process: (item) => {
                  item.data_source_dimension = dimension.entry_value;
                  item.data_source = datasourceSlug;
              },
          })
      ));
    };

    console.time(`fetchDatasourceEntries-${datasourceSlug}`);
    await fetchAllEntries();
    console.timeEnd(`fetchDatasourceEntries-${datasourceSlug}`);
  };

  await Promise.all(datasources.map(datasource => limit(() => fetchDatasourceEntries(datasource))));
};

exports.onCreateNode = async (
  { node, actions: { createNode }, createNodeId, getCache, cache },
  options
) => {
  if (!options.localAssets) {
    return;
  }

  // if (node.internal.type === 'StoryblokEntry') {
  //   const assetRegex = /(https:\/\/a\.storyblok\.com.+?(?:\.)(\w)*)/g;
  //   let imagePaths = node.content.match(assetRegex);
  //   if (imagePaths?.length) {
  //     imagePaths.forEach(async (imagePath) => {
  //       let fileNodeID;

  //       const mediaDataCacheKey = `sb-${imagePath.replace(/[\/|\\|https:]/g, '')}`;
  //       const cacheMediaData = await getCache(mediaDataCacheKey);
  //       const isCached = cacheMediaData && node.cv === cacheMediaData.updatedAt;

  //       if (isCached) {
  //         fileNodeID = cacheMediaData.fileNodeID;
  //       }

  //       if (!fileNodeID && imagePath) {
  //         const fileNode = await createRemoteFileNode({
  //           url: imagePath,
  //           parentNodeId: node.id,
  //           createNode,
  //           createNodeId,
  //           getCache,
  //         });

  //         if (fileNode.id) {
  //           fileNodeID = fileNode.id;
  //           await cache.set(mediaDataCacheKey, {
  //             fileNodeID,
  //             updatedAt: node.cv,
  //           });
  //         }
  //       }
  //     });
  //   }
  // }
};
