<div class="container">
    <div class="typography">
        <h1>[h1] Lorem ipsum dolor sit</h1>
        <h2>[h2] Ligula Tellus Cursus Mattis</h2>
        <h3>[h3] Ornare Fermentum</h3>
        <h4>
            [h4] Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
            vestibulum.
        </h4>
        <h5>
            [h5] Maecenas sed diam eget risus varius blandit sit amet non magna.
        </h5>
        <h6>[h6] Pharetra Ornare Nibh Dolor Etiam</h6>

        <p>
            [p] Aenean lacinia bibendum nulla sed consectetur. Integer posuere erat
            a ante venenatis dapibus posuere velit aliquet. Maecenas faucibus mollis
            interdum. Donec id elit non mi porta gravida at eget metus. Duis mollis,
            est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio
            sem nec elit. Donec ullamcorper nulla non metus auctor fringilla.
            Curabitur blandit tempus porttitor.
        </p>

        <blockquote>
            <p>
                [blockquote] Nullam id dolor id nibh ultricies vehicula ut id elit.
                Aenean lacinia bibendum nulla sed consectetur.
            </p>
        </blockquote>

        <hr />

        <h3>Unordered list</h3>

        <ul>
            <li>Item 1</li>
            <li>
                Item 2
                <ul>
                    <li>Item 2.1</li>
                    <li>
                        Item 2.2
                        <ul>
                            <li>Item 2.2.1</li>
                        </ul>
                    </li>
                    <li>Item 2.3</li>
                </ul>
            </li>
            <li>Item 3</li>
        </ul>

        <h3>Ordered list</h3>
        <ol>
            <li>Item 1</li>
            <li>
                Item 2
                <ol>
                    <li>Item 2.1</li>
                    <li>
                        Item 2.2
                        <ol>
                            <li>Item 2.2.1</li>
                        </ol>
                    </li>
                    <li>Item 2.3</li>
                </ol>
            </li>
            <li>Item 3</li>
        </ol>

        <hr />

        <h3>Image</h3>

        <figure>
            <img src="$PlaceholderImageURL" />
            <figcaption>
                A polymer being a substance which is built up by a large number of
                similar units bonded together.
            </figcaption>
        </figure>

        <hr />

        <h3>Table</h3>
        <table>
            <tbody>
                <tr>
                    <th style="width: 160px;">Who’s involved</th>
                    <td>Short paragraph about what this means Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</td>
                </tr>
                <tr>
                    <th>What you can do</th>
                    <td>
                        <p>
                            Short paragraph about what this means Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <p><a href="#">Submitting a request</a></p>
                    </td>
                </tr>
                <tr>
                    <th>Useful links</th>
                    <td>
                        <p>
                            <a href="https://google.com">Link name one</a>
                        </p>
                        <p>
                            <a href="https://google.com">Link name two</a>
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>

        <hr />

        <h3>Definition list</h3>

        <dl>
            <dt>Definition List Title</dt>
            <dd>Definition list division.</dd>
            <dt>Kitchen Sink</dt>
            <dd>
                Used in expressions to describe work in which all conceivable (and
                some inconceivable) sources have been mined. In this case, a bunch
                of markup.
            </dd>
            <dt>aside</dt>
            <dd>Defines content aside from the page content</dd>
            <dt>blockquote</dt>
            <dd>Defines a section that is quoted from another source</dd>
        </dl>

        <hr />

        <h3>Links</h3>

        <a href="#">Text link</a><br />
        <a href="https://google.com">External link</a><br />
        <a href="#" class="link link__download" download
            ><span class="link__download-name">Text document link</span>
            <span class="link__download-details">(DOC, 145KB)</span></a
        >

        <h3>Buttons</h3>

        <a href="#" class="button button--text">Link</a>
        <button type="button" class="button button--text">Button</button>
        <input type="submit" class="button button--text" value="Input" />
        <button type="button" class="button button--link">Button (Link style)</button>

        <hr />

        <% include SimpleStyleguideColorSwatches %>
    </div>
</div>
