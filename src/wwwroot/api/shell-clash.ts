/**
 * This file is part of ts-node-express-boilerplate.
 * @link     : https://zhaiyiming.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2018 TINYMINS.
 */

import http from 'http';
import https from 'https';
import yaml from 'yaml';

import { createGroups, ruleProvidersList } from '../../config';
import { ExpressRouterHandler } from '../../types';
import axios from '../../utils/axios';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  keepAlive: true,
});
const httpAgent = new http.Agent({
  keepAlive: true,
});

const handler: ExpressRouterHandler = async (req, res) => {
  try {
    const url = req.query.url;
    if (typeof url !== 'string') {
      res.status(400);
      res.send('missing url');
      return;
    }
    const ret = await axios.get(url, {
      httpAgent,
      httpsAgent,
      transformResponse: _ => _,
    });
    if (ret.data) {
      const a = yaml.parse(ret.data) as { proxies: { name: string }[] };
      const nodes = a.proxies.map(item => item.name);

      const ruleSet: string[] = [];
      const ruleProviders = {};
      Object.keys(ruleProvidersList).forEach((key) => {
        const item = ruleProvidersList[key];
        item.forEach((i) => {
          ruleSet.push(`RULE-SET,${i.name},${key}`);
          ruleProviders[i.name] = {
            type: 'http',
            behavior: 'classical',
            url: i.path,
            path: `/tmp/clash-rule/${i.name}`,
            interval: 86400,
          };
        });
      });

      const rules = [
        ...ruleSet,
        /*
         * ...Object.keys(ruleSet).map((name) => `RULE-SET,${name},${ruleSet[name]}`),
         * 'GEOIP,LAN,🚀直接连接',
         */
        'DOMAIN-SUFFIX,local,DIRECT',
        'GEOIP,CN,DIRECT',
        'MATCH,⚓️其他流量',
      ];

      const data = {
        port: 7890,
        'socks-port': 7891,
        'redir-port': 7892,
        'tproxy-port': 7895,
        'mixed-port': 7890,
        'allow-lan': true,
        mode: 'Rule',
        'log-level': 'silent',
        'external-controller': ':9090',
        secret: '123456',
        proxies: a.proxies,
        'proxy-groups': createGroups(nodes),
        'rule-providers': ruleProviders,
        rules,
        /*
         * ipv6: false,
         * 'bind-address': '*',
         * dns: {
         *   enable: true,
         *   ipv6: false,
         *   'enhanced-mode': 'fake-ip',
         *   'fake-ip-range': '198.18.0.1/16',
         *   listen: '0.0.0.0:1053',
         *   nameserver: ['202.101.172.35', '202.101.172.47', '119.28.28.28', '223.5.5.5'],
         *   fallback: ['https://dns.cloudflare.com/dns-query', 'https://1.1.1.1/dns-query', 'tls://1.1.1.1:853', 'tls://8.8.8.8:853'],
         *   'default-nameserver': ['119.28.28.28', '223.5.5.5', '202.101.172.35', '202.101.172.47'],
         *   'fallback-filter': {
         *     geoip: true
         *   },
         * },
         */
        profile: {
          'store-selected': true,
          'store-fake-ip': true,
          tracing: true,
        },
        /*
         * tun: {
         *   enable: true,
         *   stack: 'system',
         *   'auto-route': false,
         *   'auto-detect-interface': false,
         *   'dns-hijack': ['tcp://any:53']
         * }
         */
      };
      res.setHeader('content-type', 'text/plain; charset=utf-8');
      res.send(`
#---------------------------------------------------#
## Update: ${new Date().toString()}
#---------------------------------------------------#
${yaml.stringify(data)}`);
    }
  } catch (error) {
    res.status(500);
    res.send(error instanceof Error ? error.message : String(error));
  }
};

export default handler;
