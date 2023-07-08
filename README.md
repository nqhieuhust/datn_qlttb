#INFO
### `- FE => http://qltb.topcode.fun`
### `- BE => http://api-qltb.topcode.fun`
#RUN BUILD REACTJS
### `pm2 --name 2023_reactjs_nodejs_qlthietbi  serve build/ 3010 --spa`
### `pm2 start dist/main.js --name "2023_reactjs_nodejs_qlthietbi_be" => Lần sau chỉ cần pm2 restart 2023_reactjs_nodejs_qlthietbi_be` 
```
    BE Use port 3050
```
