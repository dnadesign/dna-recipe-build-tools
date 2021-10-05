<!DOCTYPE html>
<html lang="en-NZ">
    <head>
        <% base_tag %>

        <meta charset="utf-8" />
        <title>$Title – $SiteConfig.Title</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">

        $MetaTags(false)

        <link rel="canonical" href="$AbsoluteLink" />
        <meta name="theme-color" content="#05f" />

        <% if $getFavicon('svg') %><link rel="icon" type="image/svg+xml" href="$getFavicon('svg')"><% end_if %>
        <% if $getFavicon('png') %><link rel="icon" type="image/png" href="$getFavicon('png')"><% end_if %>
        <% if $getFavicon('ico') %><link rel="alternate icon" href="$getFavicon('ico')"><% end_if %>
    </head>

    <body class="page--{$ContentSource.ClassName.ShortName.LowerCase}">
        <div class="example" data-example-title="Vue is running">{{ exampleTitle }}</div>
    </body>
</html>
