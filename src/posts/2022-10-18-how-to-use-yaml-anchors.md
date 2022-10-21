---
title: How To Use YAML Anchors
description: This week I learned how to use YAML anchors to simplify docker compose files and save lines of code.
date: 2022-10-18T20:30:00-05:00
tags:
    - this-week-i-learned
    - how-to
---
This week I learned about YAML anchors. A YAML anchor is a way to assign a name to a chunk of YAML, then reuse that chunk elsewhere in the document.

<pre class="codeWrapper"><code class="language-yaml">
twins:
  Fred: &twinDetails
    hairColor: red
    lastName: Weasley
    mischievous: true
  George: *twinDetails
</code></pre>

In the example above, the name "twin-details" references all the properties of Fred, and George gets an exact copy of the same properties. Try pasting this example into [yamllint.com](http://www.yamllint.com/) to see how it expands out.

One practical use I have found for these is in docker-compose files. A common docker setup for a development environment is to have a single proxy container and several application containers. In that setup, each container needs an <code class="language-yaml">extra_hosts</code> section containing the host names and IP addresses for all containers in the docker compose. That repeated block is a perfect use-case for a YAML anchor.

<pre class="codeWrapper"><code class="language-yaml">
version: '3'
services:
  proxy:
    image: nginx:1.23.1-alpine
    container_name: proxy
    hostname: dev.proxy.com
    extra_hosts: &extra_hosts
      - dev.proxy.com:10.2.0.1
      - dev.frontend.com:10.2.0.2
      - dev.microservice-1.com:10.2.0.3
      - dev.microservice-2.com:10.2.0.4
    ports:
      - "80:80"
      - "443:443"
    networks:
      proxy:
        ipv4_address: 10.2.0.1
  frontend:
    image: 'ghcr.io/company/app-frontend:23'
    container_name: frontend
    hostname: dev.frontend.com
    extra_hosts: *extra_hosts
    volumes:
      - ~/frontend/repo:/var/www/html
    ports:
      - "10080:80"
      - "10443:443"
    networks:
      proxy:
        ipv4_address: 10.2.0.2
  microservice-1:
    image: 'ghcr.io/company/microservice-1:17'
    container_name: 'microservice-1'
    hostname: dev.microservice-1.com
    extra_hosts: *extra_hosts
    volumes:
      - ~/microservice-1/repo:/var/www/html
      - ~/microservice-1/data:/var/lib/mysql
    ports:
      - "20080:80"
      - "20443:443"
      - "23306:3306"
    networks:
      proxy:
        ipv4_address: 10.2.0.3
  microservice-2:
    image: 'ghcr.io/company/microservice-2:39'
    container_name: 'microservice-2'
    hostname: dev.microservice-2.com
    extra_hosts: *extra_hosts
    volumes:
      - ~/microservice-2/repo:/var/www/html
      - ~/microservice-2/data:/var/lib/mysql
    ports:
      - "30080:80"
      - "30443:443"
      - "33306:3306"
    networks:
      proxy:
        ipv4_address: 10.2.0.4
networks:
  proxy:
    driver: bridge
    ipam:
      driver: default
      config:
        - subnet: 10.2.0.0/24
</code></pre>

When adding a new microservice to the example above, the list of extra hosts only needs to be edited in a single place. Plus, the file is 12 lines of code shorter than without YAML anchors.

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/themes/prism-tomorrow.min.css" integrity="sha512-kSwGoyIkfz4+hMo5jkJngSByil9jxJPKbweYec/UgS+S1EgE45qm4Gea7Ks2oxQ7qiYyyZRn66A9df2lMtjIsw==" crossorigin="anonymous" referrerpolicy="no-referrer">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js" integrity="sha512-UOoJElONeUNzQbbKQbjldDf9MwOHqxNz49NNJJ1d90yp+X9edsHyJoAs6O4K19CZGaIdjI5ohK+O2y5lBTW6uQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/components/prism-yaml.min.js" integrity="sha512-epBuSQcDNi/0lmCXr7cGjqWcfnzXe4m/GdIFFNDcQ7v/JF4H8I+l4wmVQiYO6NkLGSDo3LR7HaUfUL/5sjWtXg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>