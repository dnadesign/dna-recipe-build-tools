<!DOCTYPE html>
<%-- 'no-js' is removed by modernizr if it loads --%>
<html class="no-js" lang="en-NZ">
    <head>
        <% if HotURL %>
            <base href="$HotURL">
        <% else %>
            <% base_tag %>
        <% end_if %>

        <meta charset="utf-8" />
        <title>$Title – $SiteConfig.Title</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        $MetaTags(false)

        <link rel="canonical" href="$AbsoluteLink" />
        <meta name="theme-color" content="#000" />
    </head>

    <body>
        <div class="example" data-exampletitle="Vue is running">{{ exampletitle }}</div>
    </body>
</html>
