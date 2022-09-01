#!/usr/bin/env bash
npm config get registry 
npm config set registry=http://registry.npmjs.org
echo '请进行登录相关操作'
npm login 
echo 'publish-------'
npm config set registry=
echo '发布完成'
exit