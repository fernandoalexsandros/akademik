var $select2_options = {
    placeholder: "Search for an item code",
    minimumInputLength: 3,
    ajax: { // instead of writing the function to execute the request we use Select2's convenient helper
        url: base_url+'?do=admin_ajax',
        dataType: 'json',
        data: function (term, page) {
            return {
                page: 'item-code',
                code: term, // search term
                page_limit: 10
            };
        },
        results: function (data, page) { // parse the results into the format expected by Select2.
            // since we are using custom formatting functions we do not need to alter remote JSON data
            return {results: data.items};
        }
    },
    initSelection: function(element, callback) {
        // the input tag has a value attribute preloaded that points to a preselected movie's id
        // this function resolves that id attribute to an object that select2 can render
        // using its formatResult renderer - that way the movie name is shown preselected
        var id=$(element).val();
        if (id!=="") {
            $.ajax(base_url+'?do=admin_ajax', {
                data: {
                    page: 'item-code',
                    code: id
                },
                dataType: "json"
            }).done(function(data) { console.log(data.items[0]); return callback(data.items[0]); });
        }
    },
    formatResult: format_item_code, // omitted for brevity, see the source of this page
    formatSelection: format_item_code,  // omitted for brevity, see the source of this page
    escapeMarkup: function (m) { return m; } // we do not want to escape markup since we are displaying html in results
};

function toggle_extra(div_id) {
    $('.extra_' + div_id).fadeToggle();
}


jQuery.fn.fadeToggle = function (s, fn) {
    return (this.is(":visible"))
        ? this.fadeOut(s, fn)
        : this.fadeIn(s, fn);
}

function toggle_extra(div_id) {
    $('.extra_' + div_id).fadeToggle();
}

function toggle_fade(div_id) {
    $('.row' + div_id).fadeToggle();
}


function Comma(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 2 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function showHide(shID) {
    if (document.getElementById(shID)) {
        if (document.getElementById(shID + '-show').style.display != 'none') {
            document.getElementById(shID + '-show').style.display = 'none';
            document.getElementById(shID).style.display = 'block';
        }
        else {
            document.getElementById(shID + '-show').style.display = 'inline';
            document.getElementById(shID).style.display = 'none';
        }
    }
}

function voteScript(siteID, siteName) {
    var voteInfo = document.getElementById('show_vinfo');

    voteInfo.innerHTML = '<form action="./vote.php" method="post" target="_blank">'
        + '[' + siteName + '] Your Account Name: <input type="text" name="vote_account" /> '
        + ' <input type="hidden" name="vote_id" value="' + siteID + '">'
        + ' <input type="submit" name="Vote!" value="Vote!">'
        + '</form>';
}

function calculate_amount(id, price, preamount, current_gp) {
    var setprice = document.getElementById('price_' + id);
    var amount = document.getElementById('amount_' + id);
    var gp_after = document.getElementById('gpafter_' + id);

    var single_price, total_price, gpafter_price;

    single_price = Math.ceil(price / preamount);
    final_price = Math.ceil(single_price * amount.value);

    setprice.innerHTML = Comma(final_price) + ' GP';
    gp_after.innerHTML = Comma(current_gp - final_price) + ' GP';

}

function addFormField() {
    var id = document.getElementById("id").value;


    $("#myTable tr:eq(1)").before("     <tr id='row" + id + "'><td class='alt2' nowrap>" + id + "</td><td class='alt1' nowrap><input type='hidden' size='5' name='item_code[]' class='item_code_ajax' onchange='check_itemname(\"item_code" + id + "\", \"results_div" + id + "\");' id='item_code" + id + "'/></td><td class='alt1' nowrap><input type='text' size='1' name='item_amount[]' value='0'/></td><td class='alt1' nowrap><select name='item_ups[]'><option value='0'>+0</option><option value='1'>+1</option><option value='2'>+2</option><option value='3'>+3</option><option value='4'>+4</option><option value='5'>+5</option><option value='6'>+6</option><option value='7'>+7</option></select>/<select name='item_slots[]'><option value='0'>0</option><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option></select> <select name='item_talic[]'><option value='1'>No Talic</option><option value='2'>Rebirth</option><option value='3'>Mercy</option><option value='4'>Grace</option><option value='5'>Glory</option><option value='6'>Guard</option><option value='7'>Belief</option><option value='8'>Sacred Flame</option><option value='9'>Wisdom</option><option value='10'>Favor</option><option value='11'>Hatred</option><option value='12'>Chaos</option><option value='13'>Darkness</option><option value='14'>Destruction</option><option value='15'>Ignorant</option></select></td><td class='alt1' nowrap><input type='text' size='5' name='item_rental_time[]' value='0'/></td><td class='alt1' nowrap><a href='#' onClick='removeFormField(\"#row" + id + "\"); return false;'>Remove</a></td></tr>");

    $('.item_code_ajax').select2($select2_options);

    id = (id - 1) + 2;

    document.getElementById("id").value = id;
}

function removeFormField(id) {
    $(id).remove();
}

function convert(id, rate, max, current, points, currency) {
    var current;
    var result_input = document.getElementById('result_' + id);
    var exchange_input = document.getElementById('exchange_' + id);

    if (isNaN(exchange_input.value)) {
        exchange_input.value = 0;
    }

    if (exchange_input.value < 0) {
        exchange_input.value = 0;
    }

    if (exchange_input.value > points) {
        exchange_input.value = points;
    }

    money = Math.floor(rate * exchange_input.value);

    if (money > max) {
        money = Math.floor(max);
        max_value = Math.floor(money / rate);
        exchange_input.value = Math.floor(max_value);
        money = Math.floor(rate * exchange_input.value);
    }

    total = Comma(Math.floor(current + money));
    money = Comma(Math.floor(money));

    result_input.innerHTML = 'Exchange: ' + money + ' ' + currency + '<br/>Total: ' + total;
}


// Item Code Ajax
function format_item_code(item) {
    return item.id + ' - ' + item.name;
}


$('document').ready(function () {
    $.urlParam = function(name){
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results==null){
            return null;
        }
        else{
            return results[1] || 0;
        }
    }

    var url = window.location;
    // Will only work if string in href matches with location
    $('ul.nav a[href="'+ url +'"]').parent().parent().parent().addClass('active');

    // Will also work for relative and absolute hrefs
    $('ul.nav a').filter(function() {
        return this.href == url;
    }).parent().parent().parent().addClass('active');

    // Select category
    $('#rebirth-shop-category').on('change', function (event) {
        event.preventDefault();
        var cat_id = $(this).val();
         if($.urlParam('category_id') != null) {
            var regEx = /([?&]category_id)=([^#&]*)/g;
            var newurl = url.href.replace(regEx, '$1='+cat_id.toString());
            window.location = newurl;
        } else {
             window.location = url.href + '&category_id=' + cat_id.toString();
        }
    });

    // Upgrades...
    $('.upgrades_to_img').each(function (index) {
        var hex = parseInt($(this).text());
        hex = hex.toString(16);
        var totalSlots = hex[0];
        var totalUpgrades = 0;
        var decValue = 0;

        // Reverse this
        hex = hex.substr(1).split("").reverse().join("");

        var images = '';

        if (totalSlots != 'f' && totalSlots != '0') {
            for (var i = 0; i < totalSlots; i++) {
                if (hex[i] == undefined) {
                    decValue = 15;
                }
                else {
                    decValue = parseInt(hex[i], 16);
                }
                images = images + '<img class="upgrade_img" src="includes/templates/assets/images/talic/t-' + decValue + '.png" alt="talic" id="talic-' + decValue + '" /> ';
            }
            $(this).html(images);
        }
        else {
            $(this).text('N/A');
        }

        $(this).show();
    });

    // Convert upgrade codes to text
    $('.upgrades_to_text').each(function (index) {
        var hex = $(this).text();
        var totalSlots = hex[0];
        var totalUpgrades = 0;
        var decValue = 0;

        if (totalSlots != 'f') {
            for (var i = 1; i < hex.length; i++) {
                decValue = parseInt(hex[i], 16);
                if (decValue != 15) {
                    totalUpgrades++;
                }
            }
            $(this).text("+" + totalUpgrades + "/[" + totalSlots + "]");
        } else {
            $(this).text('N/A');
        }
    });

    $(".item_code_ajax").select2($select2_options);


    // Prevent double submissions
    $('form').submit(function (e) {
        var theForm = $(this);

        if(theForm.attr('id') == 'auction-form') {
            return true;
        }

        setTimeout(function () {
            var btn = theForm.find('*[type="submit"]');
            btn.attr('disabled', 'disabled');
            btn.val('Sending');
            btn.text('Sending');
        }, 10);

        return true;
    });

    /**
     * Auction JavaScript
     */
    var $body = $('body');
    var auction_total_fees = 0;
    var auction_listing_fees = 0;
    var auction_feature_fees = 0;
    var auction_list_period_fees = 0;
    var auction_total_listed = 0;

    $('#auction-character-serial').on('change', function (event) {

        var serial = $(this).val();

        // Reset
        auction_total_fees = 0;
        auction_listing_fees = 0;
        auction_feature_fees = 0;
        auction_list_period_fees = 0;
        auction_total_listed = 0;

        update_total_items(0);
        update_auction_fees(auction_total_fees, auction_listing_fees, auction_feature_fees);

        $.post('index.php?do=user_auction&page=ajax-inventory&serial='+serial, function (data) {
            var table = $('#auction-inventory-items').find('tbody');

            var html = '';
            $.each(data.items, function (key, value) {
                html += '              <tr data-slot="'+value['slot']+'">';
                html += '                  <td><input name="inventory_slot[]" type="checkbox" value="'+value['slot']+'" class="auction-item-slot-check"></td>';
                html += '                  <td>'+value['item_info']['name']+'</td>';
                html += '                  <td class="text-center">'+value['d']+'</td>';
                html += '                  <td><span class="upgrades_to_img">'+value['u']+'</span></td>';
                html += '                  <td class="auction-listing-fee">'+value['listing_fee']+' GP</td>';
                html += '                  <td class="auction-list-time">';
                html += '                   <select name="list_time[]" id="auction-list-time" class="form-control">';
                $.each(data.list_times, function (list_time, info) {
                    html += '                       <option value="'+list_time+'" data-list-time-fee="'+info.fee+'">'+info.title+' - '+info.fee+' GP</option>';
                });
                html += '                   </select>';
                html += '                   </td>';
                html += '                  <td class="auction-starting-bid"><input name="starting_bid[]" type="number" class="form-control" placeholder="e.g. 100" disabled></td>';
                html += '              </tr>';
            });

            table.html(html);

        }, 'json');

    });

    $('#auction-form').on('submit', function (event) {
        event.preventDefault();

        // Let' get our data
        var data = $(this).serialize();
        $.post('index.php?do=user_auction&page=ajax-add-item', data, function (data) {
            console.log(data);
        }, 'json');
    });

    $body.on('change', '#auction-list-time', function (event) {
        var list_time_fee = parseInt($(this).find(':selected').attr('data-list-time-fee'));
        auction_total_fees = auction_listing_fees + auction_feature_fees + list_time_fee;
        update_auction_fees(auction_total_fees, auction_listing_fees, auction_feature_fees);
    });

    $body.on('click', '#auction-is-featured', function (event) {
        if($(this).is(':checked')) {
            auction_feature_fees = auction_total_listed * parseInt($(this).val());
        } else {
            auction_feature_fees = 0;
        }

        auction_total_fees = auction_listing_fees + auction_feature_fees + auction_list_period_fees;
        update_auction_fees(auction_total_fees, auction_listing_fees, auction_feature_fees, auction_list_period_fees);
    });

    $body.on('click', '.auction-item-slot-check', function (event) {

        var list_fee = 0;
        var list_period_fee = 0;
        var feature_fee = 0;
        var slot = $(this).val();
        var tr = $('tr[data-slot="'+slot+'"]');
        var starting_bid = tr.find('.auction-starting-bid').find('input');
        var list_time = tr.find('.auction-list-time').find('select');

        var feature = $('#auction-is-featured');
        if(feature.is(':checked')) {
            feature_fee = parseInt(feature.val());
        }

        list_fee = parseInt(tr.find('.auction-listing-fee').text());
        list_period_fee = parseInt(list_time.find(':selected').attr('data-list-time-fee'));

        if($(this).is(':checked')) {
            auction_listing_fees += list_fee;
            auction_feature_fees += feature_fee;
            auction_list_period_fees += list_period_fee;
            auction_total_listed++;
            list_time.show();
            list_time.prop('disabled', false);
            starting_bid.show();
            starting_bid.prop('disabled', false);
            tr.addClass('warning');
        } else {
            auction_listing_fees -= list_fee;
            auction_feature_fees -= feature_fee;
            auction_total_listed--;
            auction_list_period_fees -= list_period_fee;
            list_time.hide();
            list_time.prop('disabled', true);
            starting_bid.hide();
            starting_bid.prop('disabled', true);
            tr.removeClass('warning');
        }

        auction_total_fees = auction_listing_fees + auction_feature_fees + auction_list_period_fees;
        update_auction_fees(auction_total_fees, auction_listing_fees, auction_feature_fees, auction_list_period_fees);
        update_total_items(auction_total_listed);

    });

});

function update_total_items(total_items)
{
    $('#auction-total-items').text(total_items);
}

function update_auction_fees(total_fees, listing_fees, feature_fee, auction_list_period_fees)
{
    $('#auction-list-fee').text(listing_fees);
    $('#auction-list-period-fee').text(auction_list_period_fees);
    $('#auction-feature-fee').text(feature_fee);
    $('#auction-total-fee').text(total_fees);
}