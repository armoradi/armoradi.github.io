---
layout: page
permalink: /presentations/
title: presentations
description: Talks and posters at conferences and workshops.
nav: true
nav_order: 4
---

{% for p in site.data.presentations %}

<div class="mb-5">
  <h4>{{ p.event }}</h4>
  <p class="mb-2">
    <span class="badge rounded w-auto">{{ p.type }}</span>
    <em>{{ p.date }}</em>
  </p>
  {% if p.title %}
    <p>
      {% if p.link %}<a href="{{ p.link }}">{{ p.title }}</a>{% else %}{{ p.title }}{% endif %}
    </p>
  {% endif %}
  {% if p.photos %}
    <div class="row">
      {% for photo in p.photos %}
        <div class="col-sm-6 mb-3">
          {% capture photo_path %}assets/img/presentations/{{ photo }}{% endcapture %}
          {% include figure.liquid loading="eager" path=photo_path title=p.event alt=p.event class="img-fluid rounded z-depth-1" zoomable=true %}
        </div>
      {% endfor %}
    </div>
  {% endif %}
</div>
{% endfor %}
