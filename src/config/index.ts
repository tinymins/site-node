/**
 * This file is part of ts-node-express-boilerplate.
 * @link     : https://zhaiyiming.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2018 TINYMINS.
 */

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv)).argv;

if (!argv || argv instanceof Promise) {
  throw new Error('yargs parse failed!');
}

/**
 * 监听端口号
 */
export const port = Number(argv.port || 80);

/**
 * 允许跨域访问的域名列表
 */
export const accessControlAllowOrigin = [
  /.*\..*(?::\d+)?$/uis,
];

export const createGroups = (nodes: string[]) => {
  const groups = [
    { name: '⚖️负载均衡', type: 'load-balance', proxies: [...nodes], url: 'https://1.0.0.1', interval: 18000, strategy: 'consistent-hashing' },
    { name: '😂Fallback', type: 'fallback', proxies: [...nodes], url: 'https://1.0.0.1', interval: 120 },
    { name: '🔰国外流量', type: 'select', proxies: ['⚖️负载均衡', '😂Fallback', ...nodes, '🚀直接连接'] },
    { name: '🏳️‍🌈Google', type: 'select', proxies: ['🔰国外流量', ...nodes] },
    { name: '✈️Telegram', type: 'select', proxies: ['🔰国外流量', ...nodes] },
    { name: '🎬Youtube', type: 'select', proxies: ['🔰国外流量', ...nodes] },
    { name: '🎬Netflix', type: 'select', proxies: ['🔰国外流量', ...nodes] },
    { name: '🎬HBO', type: 'select', proxies: ['🔰国外流量', ...nodes] },
    { name: '🎬Hulu', type: 'select', proxies: ['🔰国外流量', ...nodes] },
    { name: '🎬DisneyPlus', type: 'select', proxies: ['🔰国外流量', ...nodes] },
    // { name: '🎬哔哩哔哩', type: 'select', proxies: ['🚀直接连接', '🔰国外流量', ...nodes] },
    { name: '🍎苹果服务', type: 'select', proxies: ['🚀直接连接', '🔰国外流量', ...nodes] },
    { name: '🙂Microsoft', type: 'select', proxies: ['🚀直接连接', '🔰国外流量', ...nodes] },
    // { name: '🙂GoogleCN', type: 'select', proxies: ['🚀直接连接', '🔰国外流量', ...nodes] },
    { name: '🙂GitHub', type: 'select', proxies: ['🚀直接连接', '🔰国外流量', ...nodes] },
    { name: '🙂Crypto', type: 'select', proxies: ['🚀直接连接', '🔰国外流量', ...nodes] },
    { name: '🚀直接连接', type: 'select', proxies: ['DIRECT'] },
    { name: '💊广告合集', type: 'select', proxies: ['DIRECT', 'REJECT'] },
    { name: '1️⃣国内自定义合集', type: 'select', proxies: ['🚀直接连接', '🔰国外流量', ...nodes] },
    { name: '⚓️其他流量', type: 'select', proxies: ['🔰国外流量', '🚀直接连接'] },
  ];
  return groups;
};

export const ruleProvidersList: Record<string, { name: string; path: string }[]> = {
  '🍎苹果服务': [
    { name: 'Apple', path: 'https://raw.fastgit.org/DivineEngine/Profiles/master/Clash/RuleSet/Extra/Apple/Apple.yaml' },
    { name: 'AppStore', path: 'https://raw.fastgit.org/DivineEngine/Profiles/master/Clash/RuleSet/Extra/Apple/AppStore.yaml' },
    { name: 'AppStoreConnect', path: 'https://raw.fastgit.org/DivineEngine/Profiles/master/Clash/RuleSet/Extra/Apple/AppStoreConnect.yaml' },
    { name: 'AppleMusic', path: 'https://raw.fastgit.org/DivineEngine/Profiles/master/Clash/RuleSet/Extra/Apple/Music.yaml' },
    { name: 'AppleSoftwareUpdate', path: 'https://raw.fastgit.org/DivineEngine/Profiles/master/Clash/RuleSet/Extra/Apple/SoftwareUpdate.yaml' },
    { name: 'AppleTV', path: 'https://raw.fastgit.org/DivineEngine/Profiles/master/Clash/RuleSet/Extra/Apple/TV.yaml' },
  ],
  '🙂Microsoft': [
    { name: 'Microsoft', path: 'https://raw.fastgit.org/dler-io/Rules/main/Clash/Provider/Microsoft.yaml' },
  ],
  /*
   * '🙂GoogleCN': [
   *   { name: 'GoogleCN', path: 'https://raw.fastgit.org/ACL4SSR/ACL4SSR/master/Clash/GoogleCN.list' },
   * ],
   */
  '🏳️‍🌈Google': [
    { name: 'Google', path: 'https://raw.fastgit.org/dler-io/Rules/main/Clash/Provider/Google%20FCM.yaml' },
    { name: 'GoogleChromecast', path: 'https://raw.fastgit.org/DivineEngine/Profiles/master/Clash/RuleSet/Extra/Google/Chromecast.yaml' },
    { name: 'GoogleGoogleDrive', path: 'https://raw.fastgit.org/DivineEngine/Profiles/master/Clash/RuleSet/Extra/Google/GoogleDrive.yaml' },
    { name: 'GoogleGoogleSearch', path: 'https://raw.fastgit.org/DivineEngine/Profiles/master/Clash/RuleSet/Extra/Google/GoogleSearch.yaml' },
    { name: 'GoogleGoogleVoice', path: 'https://raw.fastgit.org/DivineEngine/Profiles/master/Clash/RuleSet/Extra/Google/GoogleVoice.yaml' },
  ],
  '🙂GitHub': [
    { name: 'GitHub', path: 'https://raw.fastgit.org/luckyyyyy/rule/master/github.yaml' },
  ],
  '🙂Crypto': [
    { name: 'Crypto', path: 'https://raw.fastgit.org/dler-io/Rules/main/Clash/Provider/Crypto.yaml' },
  ],
  '🎬Youtube': [
    { name: 'Youtube', path: 'https://raw.fastgit.org/dler-io/Rules/main/Clash/Provider/Media/YouTube.yaml' },
  ],
  '🎬Hulu': [
    { name: 'Hulu', path: 'https://raw.fastgit.org/dler-io/Rules/main/Clash/Provider/Media/Hulu.yaml' },
  ],
  '🎬HBO': [
    { name: 'HBOGo', path: 'https://raw.fastgit.org/dler-io/Rules/main/Clash/Provider/Media/HBO%20Go.yaml' },
    { name: 'HBOMax', path: 'https://raw.fastgit.org/dler-io/Rules/main/Clash/Provider/Media/HBO%20Max.yaml' },
  ],
  '🎬DisneyPlus': [
    { name: 'DisneyPlus', path: 'https://raw.fastgit.org/dler-io/Rules/main/Clash/Provider/Media/Disney%20Plus.yaml' },
  ],
  '🎬Netflix': [
    { name: 'Netflix', path: 'https://raw.fastgit.org/dler-io/Rules/main/Clash/Provider/Media/Netflix.yaml' },
  ],
  '✈️Telegram': [
    { name: 'Telegram', path: 'https://raw.fastgit.org/dler-io/Rules/main/Clash/Provider/Telegram.yaml' },
  ],
  '💊广告合集': [
    { name: 'AD', path: 'https://raw.fastgit.org/dler-io/Rules/main/Clash/Provider/Reject.yaml' },
  ],
  '1️⃣国内自定义合集': [
    { name: 'CCN', path: 'https://raw.fastgit.org/luckyyyyy/rule/master/CCN.yaml' },
  ],
};

export const nodeBlacklist: string[] = [
  'http://',
  'https://',
  '访问官网',
  '暂时下架',
  '二手倒卖',
];
