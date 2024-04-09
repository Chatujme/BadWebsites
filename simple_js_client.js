// A simple client to add a warning triangle with bs popover information for each href link found in a site list from an api
// jQuery + Boostrap 3
var links = document.querySelectorAll('a');
var domains = [];
links.forEach(link => {
    var url = link.href;
    try {
        var hostname = new URL(url).hostname;
        var domain = hostname.replace(/^www\./, '');
        domains.push(domain);
    } catch (error) {
        console.error("Chyba při zpracování URL:", error);
    }
});


var uniqueDomains = [...new Set(domains)];

fetch('https://api.chatujme.cz/bad-websites/list?' + uniqueDomains.map(domain => 'domain[]=' + domain).join('&') + '&fullUrl=1')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            var domain = item.domain;
            var affectedLinks = document.querySelectorAll('a[href*="' + domain + '"]');
            affectedLinks.forEach(link => {
                var icon = document.createElement('span');
                icon.className = 'glyphicon glyphicon-exclamation-sign text-danger';
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

