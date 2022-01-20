# Service Catalog

The next ingredient, and arguably the one that takes the most time, is to create a Service Catalog, which has all of
your company's vetted, tested, reusable, off-the-shelf solutions for infrastructure and applications. Developers love
to try out new languages, frameworks, and tools, and while that can be a lot of fun, in a company setting, that can be
harmful, both in terms of wasting some of your precious innovation tokens (see: [Choose Boring
Technology](http://boringtechnology.club/)) and in terms of failing to meet all your company's requirements for going
to prod (as defined in the previous section).

Creating an official Service Catalog in your company makes it explicit which languages, frameworks, and tools have been
vetted, approved, and already meet all requirements out-of-the-box. If a developer wants to try out something new, they
of course can, but if they want to introduce an entirely new programming language or framework into the company, they
now have to first add it to the Service Catalog, and ensure it solves all the problems the existing languages and
frameworks have already solved. This is good in two senses: it makes it clear and explicit what your languages and
frameworks must be able to do to be allowed in production and, by making all those requirements more visible, it
reduces the odds that someone tries to put something in prod that does not meet your company's requirements.

Note that the term "Service Catalog" is a bit overloaded, so in the next section, we'll dive into the details of what we
mean by "Service Catalog" in this guide, and what a modern Service Catalog looks like.


<!-- ##DOCS-SOURCER-START
{"sourcePlugin":"Local File Copier","hash":"e739cf7f5fe2d33574ca92f874fb7bc2"}
##DOCS-SOURCER-END -->
