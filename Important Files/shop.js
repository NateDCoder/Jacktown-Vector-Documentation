
const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim().split('=');
        if (c[0] === name) {
            return c[1];
        }
    }
    return "";
}

const setCookie = (name, value, days, path, domain, secure) => {
    let cookie = `${name}=${encodeURIComponent(value)}`;

    // Add expiry date
    if (days) {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + days);
        cookie += `; expires=${expiry.toUTCString()}`;
    }

    // Add Path, Domain, and Secure
    if (path) cookie += `; path=${path}`;
    if (domain) cookie += `; domain=${domain}`;
    if (secure) cookie += `; secure`;

    // Set an HTTP cookie
    document.cookie = cookie;
};

var hasLogin = getCookie('login');

if (window.location.origin.indexOf('file') !== -1) {
    document.body.classList.add("access-guaranted");
} else {
    document.body.classList.add("access-guaranted");

}

function loginSuccess(b) {
    // var _0xe2d3=["\x45\x6E\x73\x61\x69\x6D\x61\x64\x61\x49\x67\x75\x61\x6C\x61\x64\x61"];var a=_0xe2d3[0]
    // return b && b === a;
    return true;
}

$(window).on('load resize', function () {
    //Add/remove class based on browser size when load/resize
    var w = $(window).width();

    if (w >= 1200) {
        // if larger 
        $('#docs-sidebar').addClass('sidebar-visible').removeClass('sidebar-hidden');
    } else {
        // if smaller
        $('#docs-sidebar').addClass('sidebar-hidden').removeClass('sidebar-visible');
    }
});

$(document).ready(function () {
    /* ====== Toggle Sidebar ======= */
    $('#docs-sidebar-toggler').on('click', function () {
        if ($('#docs-sidebar').hasClass('sidebar-visible')) {
            $("#docs-sidebar").removeClass('sidebar-visible').addClass('sidebar-hidden');
        } else {
            $("#docs-sidebar").removeClass('sidebar-hidden').addClass('sidebar-visible');
        }
    });

    /* ===== Smooth scrolling ====== */
    $(document).on('click', 'a[href^="#"]:not(.expand)', function (e) {
        //store hash
        var target = this.hash;

        if (!$(this).is('.anchorjs-link')) {
            // e.preventDefault();
        }

        $('body').scrollTo(target, 250, { offset: -69, 'axis': 'y' });

        // Collapse sidebar after clicking
        if ($('#docs-sidebar').hasClass('sidebar-visible') && $(window).width() < 1200) {
            $('#docs-sidebar').removeClass('sidebar-visible').addClass('slidebar-hidden');
        }
    });

    /* wmooth scrolling on page load if URL has a hash */
    if (window.location.hash) {
        var urlhash = window.location.hash;
        $('body').scrollTo(urlhash, 0, { offset: -69, 'axis': 'y' });
    }

    $('code.split').not('.split2dots').html(function () {
        return '<span>' + $(this).html().split('___').join('</span>___<span>') + '</span>';
    });
    $('code.split2dots').html(function () {
        var split = $(this).html().split(',');
        for (let i = 0; i < split.length; i++) {
            var split2 = '<span class="sub">' + split[i].split(':').join('</span>:<span class="sub">') + '</span>';
            split[i] = '<span class="el">' + split2 + '</span>';
        }
        return split.join(',');
    });

    $('h1.docs-heading, h2.section-heading, h3.section-heading').append(function () {
        var id = $(this).closest('.docs-section, .docs-article').attr('id');
        return '<a class="anchorjs-link" aria-label="Anchor" href="#' + id + '" style="padding-left: 0.375em;">#</a>';
    });

    var search_list = [];
    $('h1.docs-heading, h2.section-heading, h3.section-heading').not('.hide-search').each(function (index, el) {
        var id = $(this).closest('.docs-section, .docs-article').attr('id');
        var docsTime = '';

        if ($(this).find('.docs-time').length) {
            docsTime = $(this).find('.docs-time').text();
        }

        search_list.push({
            "text": $(this).text().replace('#', '').replace('opcional', ''),
            "id": id,
            "docsTime": docsTime,
        });
    });
    const options = {
        includeScore: false,
        keys: ['text'],
        minMatchCharLength: 2,
        threshold: 0.5,
    };
    const fuse = new Fuse(search_list, options);

    $('[name="search"]').on('input', function (event) {
        const result = fuse.search($(this).val());
        var list = '';
        for (let i = 0; i < result.length; i++) {
            const element = result[i];
            list += '<a href="#' + element.item.id + '">' + element.item.text.replace(element.item.docsTime, `<span>${element.item.docsTime}</span>`) + '</a>';
        }
        $(this).next('#results').html(list);
    });

    var Lversion = $('#changelogModal .modal-body h6').first().find('span').text().replace('Versión', '').replace('Version', '');;
    $('.site-logo .bg-primary').text('v' + Lversion);

    $('#changelogModal .modal-body ul a').click(function (event) {
        $('#changelogModal').modal('hide');
    });

    $('.modal').on('shown.bs.modal', function () {
        $(this).find('[autofocus]').focus();
    });

    setTimeout(() => {
        var el = $('.docs-nav .nav-link.active').first();
        if (el.length) {
            var elOffset = el.position().top;
            var elHeight = el.height();
            var windowHeight = $(window).height();
            var offset = 0;

            if (elHeight < windowHeight) {
                offset = elOffset - ((windowHeight / 2) - (elHeight / 2));
            }
            else {
                offset = elOffset;
            }
            $('#docs-sidebar').animate({ scrollTop: offset }, 0);
        }
    }, 250);
});

window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('input', function (event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
}, false);
