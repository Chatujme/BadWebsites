// A simple client to add a warning triangle with bs popover information for each href link found in a site list from an api
// jQuery + Boostrap 3
// Získej všechny odkazy na stránce
var links = document.querySelectorAll('a');

// Vytvoř pole pro ukládání domén
var domains = [];

// Procházej každý odkaz a zkontroluj, zda obsahuje požadovaný řetězec
links.forEach(link => {
    var url = link.href;
    if (url.includes("//link.chatujme.cz/redirect?url=")) {
        var startIndex = url.indexOf('=') + 1;
        var decodedUrl;
        try {
            decodedUrl = decodeURIComponent(url.substring(startIndex));
            domains.push(decodedUrl);
        } catch (error) {
            console.error("Chyba při zpracování URL:", error);
        }
    }
});

// Odstraň duplicity domén
var uniqueDomains = [...new Set(domains)];

// Odešli dotaz na API
fetch('https://api.chatujme.cz/bad-websites/list?fullUrl=1', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ domains: uniqueDomains })
})
.then(response => response.json())
.then(data => {
    console.log(data);
    data.forEach(item => {
        var domain = item.domain;
        var affectedLinks = document.querySelectorAll('a[href*="' + encodeURIComponent(domain) + '"]');
        affectedLinks.forEach(link => {
            if ( link.getAttribute('data-processed') === 'true' ) {
                return;
            }
            link.setAttribute('data-processed', 'true');
            var icon = document.createElement('span');
            icon.className = 'glyphicon glyphicon-alert text-danger';
            icon.setAttribute('aria-hidden', 'true');
            icon.style.marginRight = '5px'; // Přidá odsazení mezi ikonou a odkazem
            link.parentNode.insertBefore(icon, link);

            var popoverContent = '<strong>Při konzumaci informací z těchto webů buďte obezřetní a ověřujte z více zdrojů</strong><br>';
            popoverContent += 'Tato webová stránka se nachází na ';
            if (item.source_link.length === 1) {
                popoverContent += 'seznamu dezinformačních, konspiračních nebo jinak sporných webů.';
            } else {
                popoverContent += 'několika seznamech dezinformačních, konspiračních nebo jinak sporných webů.';
            }
            popoverContent += '<hr><strong>Zdroje:</strong><ul>';
            if (item.source_link && item.source_link[0]) {
                item.source_link.forEach((source, index) => {
                    var sourceText = item.source[index];
                    if ( source != "-" ) {
                        popoverContent += '<li><a href="' + source + '" target="_blank">' + sourceText + '</a></li>';
                    } else {
                        popoverContent += '<li>' + sourceText + '</li>';
                    }
                });
            }
            popoverContent += '</ul>';
            // Přidej popover
            $(icon).popover({
                content: popoverContent,
                placement: 'left',
                trigger: 'manual',
                html: true,
                title: 'Informace o webu <strong>'+domain+'</strong><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                container: 'body',
            }).on('mouseenter', function () {
                var _this = this;
                $(this).popover('show');
                $(this).siblings('.popover').on('mouseleave', function () {
                    $(_this).popover('hide');
                });
            }).on('mouseleave', function () {
                var _this = this;
                setTimeout(function () {
                    if (!$('.popover:hover').length) {
                        $(_this).popover('hide');
                    }
                }, 100);
            }).click(function () {
                $(this).popover('hide');
            });
        });
    });
})
.catch(error => console.error("Chyba při komunikaci s API:", error));

$(document).on('click', function (e) {
    $('[data-toggle="popover"], .popover').each(function () {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');
        }
    });
});
$(document).on('click', '.popover .close', function () {
    $(this).closest('.popover').popover('hide');
});

