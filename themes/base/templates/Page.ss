<!DOCTYPE html>
<html lang="$ContentLocale">
    <head>
        <% base_tag %>

        <meta charset="utf-8" />
        <title>$Title – $SiteConfig.Title</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">

        $MetaTags(false)

        <link rel="canonical" href="$AbsoluteLink" />
        <meta name="theme-color" content="#05f" />

        <% if $FaviconSVG %><link rel="icon" type="image/svg+xml" href="$FaviconSVG"><% end_if %>
        <% if $FaviconICO %><link rel="alternate icon" href="$FaviconICO"><% end_if %>
    </head>

    <body class="page--{$ClassName.ShortName.LowerCase}">
        <div class="example" data-example-title="Vue is running">{{ exampleTitle }}</div>
    </body>
</html>
