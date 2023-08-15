# Setup

## Reverse Proxy

Inside Ec2 Instance

- sudo apt-get install nginx
- Check on port 80 of your url
- sudo vi /etc/nginx/nginx.conf
- clear and paste 'nginx.conf'
- Change server_name to your url(or anything)
- sudo nginx -s reload
- pm2 start
- go to certbot to get your ssh certificate
- create public folder in backend
- 
