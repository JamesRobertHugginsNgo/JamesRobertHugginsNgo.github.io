# Boilerplate System v1.1

James Robert Huggins Ngo\
2025-01-11

## Background

My web development projects often include many third-party dependencies with large, unnecessary, non-customizable, unreliable, insecure, or hidden codes.

## Boilerplate Code

According to Wikipedia, in computer programming, boilerplate code, or simply boilerplate, are sections of code that are repeated in multiple places with little to no variation.

Instead of using libraries and frameworks, we should create more boilerplate codes.

## Boilerplate System

My boilerplate system revolves around simple, easy-to-use boilerplate codes.

Our boilerplate code should be short, simple, customizable, modular, and shareable, covering a specific function. It should encourage developers to learn its workings and customize it for their use cases.

	## Boilerplate Comment

Add a “BOILERPLATE” comment at the file’s top to indicate it’s part of the boilerplate system.

``` CSS
/* BOILERPLATE */
```

## Conditional Comment

Add “CONDITIONAL” comments to indicate optional code sections for specific conditions. Leave them in or remove them when not needed to reduce bloat.

Avoid adding unrelated code to boilerplate code.

``` CSS
.field-button {
	...

	/* CONDITIONAL: Only needed for elements with "disabled" attribute */
	&[disabled] { ... }

	/* CONDITIONAL: Only needed for anchor element */
	&:is(a) {
		...

		/* CONDITIONAL BEGIN: Only needed for specific use case */
		...
		/* CONDITIONAL END */
	}
}
```


## To Do Comment

Add “TODO” comments for missing codes to be added by the developer.

``` CSS
/* TODO: Add missing part */
```

## Original Comment

When using or extending boilerplate, include an “ORIGINAL” comment with the permalink URL to the original code. This lets the next developer trace your code’s origin. When using a git repository, include the git tag or commit id to target a specific code version.

You can add multiple “ORIGINAL” comments to provide a link to a GitHub web page and its raw version. The raw version aids in potential automation.

This isn’t needed when creating original boilerplate.

``` CSS
/* ORIGINAL: https://github.com/JamesRobertHugginsNgo/page-width/blob/1.0.4/src/style.css */
/* ORIGINAL: https://github.com/JamesRobertHugginsNgo/page-width/raw/refs/tags/1.0.4/src/style.css */
```

## Using Github Page

When creating a boilerplate code project, I use GitHub for version control and documentation. I showcase a default implementation on my GitHub page and host my code on a server.

For a quick default implementation, you can import my boilerplate code from its GitHub page.

## Conclusion

Using boilerplate code instead of libraries and frameworks can create a more informed developer community and reduce code bloat.

Making boilerplate codes will encourage more intentional writing of reusable modules.
