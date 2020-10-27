<!DOCTYPE html>
<%-- 'no-js' is removed by modernizr if it loads --%>
<html class="no-js" lang="$ContentLocale">
    <head>
        <% base_tag %>

        <meta charset="utf-8" />
        <title>$Title – $SiteConfig.Title</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        $MetaTags(false)

        <link rel="canonical" href="$AbsoluteLink" />
        <meta name="theme-color" content="#000" />
    </head>

    <body>
        <div class="example" data-example-title="Vue is running">{{ exampleTitle }}</div>
    </body>
</html>
