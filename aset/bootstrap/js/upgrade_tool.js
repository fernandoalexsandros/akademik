// This is the variable that will store any
// upgrades done on this page load
var upgrades = {};

// We first want to load up any upgrades that might already in place
$('.upgrade-tool').each(function () {
    // Our upgrade tool
    var upgradeTool = $(this);

    // Get our ID
    var ID = upgradeTool.find('.buttons .upgrade-plus').attr('data-id');
    var inputID = $('#upgrade-tool-' + ID + '-inputid').val();

    // Some default stuff we'll need to use
    var $talicBox = $('#upgrade-tool-' + ID + ' .talics');

    // Get dec value of upgrades
    var decUpgrade = parseInt($('#' + inputID).val()).toString(16);

    // Now let's break this down, shall we?
    var talicNumber = 0;
    var totalUpgrades = decUpgrade[0];

    // If our array does not exist in our upgrades, let's add it
    if (upgrades[ID] == undefined) {
        upgrades[ID] = new Array();
    }

    // This creates the upgrade images and populates
    // our upgrade array.
    //
    // Since the data is presented to us backwards,
    // we start from the end to the beginning.
    for (var i = decUpgrade.length - 1; i >= 7 - totalUpgrades + 1; i--) {
        // Get talic number
        talicNumber = parseInt(decUpgrade[i], 16);

        // Add the talic to our cache
        upgrades[ID].push(talicNumber);

        // Create our talic image id
        talicImageId = 'upgrade-tool-talic-' + ID + '-' + (decUpgrade.length - i);

        // Add the talic or remove the talic if remove was added
        $talicBox.append(createTalicImage(talicImageId, talicNumber));
    }
});

// This does the upgrading based on the user input
$('body').on('click', '.upgrade-tool .buttons a', function (event) {
    // Prevent default action
    event.preventDefault();

    // Get our ID
    var ID = $(this).attr('data-id');
    var inputID = $('#upgrade-tool-' + ID + '-inputid').val();

    // Some default stuff we'll need to use
    var $talicSelector = $('#upgrade-tool-' + ID + ' .select-talic-type select');
    var $talicBox = $('#upgrade-tool-' + ID + ' .talics');

    // Fetch our talic value
    var talicNumber = $talicSelector.val();

    // Get our action
    var action = $(this).attr('data-action');

    // If our array does not exist in our upgrades, let's add it
    if (upgrades[ID] == undefined) {
        upgrades[ID] = [];
    }

    // Count the position we are at now
    var position = upgrades[ID].length;
    var talicImageId = '';

    // Let's check to see if this is a plus or a minus
    if (action == 'plus') {
        // Maximum of 7 talics allowed
        if (position < 7) {
            // If the previous slot was 'empty' the next slot MUST be empty as well.
            if (upgrades[ID][position - 1] == 15 && talicNumber != 15) {
                talicNumber = 15;
                $talicSelector.val(15);
            }

            // Add the talic to our cache
            upgrades[ID].push(talicNumber);

            // Create our talic image id
            talicImageId = 'upgrade-tool-talic-' + ID + '-' + (position + 1);

            // Add the talic or remove the talic if remove was added
            $talicBox.append(createTalicImage(talicImageId, talicNumber));
        }
    }
    else {
        // Continue only if we have something to remove?
        if (position > 0) {
            // Remove the last talic in the array
            upgrades[ID].pop();

            // Create our talic image id
            talicImageId = '#upgrade-tool-talic-' + ID + '-' + position;

            // Remove the talic image now
            $(talicImageId).remove();
        }
    }

    // Now let's convert this into decimal format
    // and add it to our hidden field
    modifyHexValue(ID, inputID);
});

/**
 * Creates the HTML for the talic images
 * @param id
 * @param talicNumber
 * @return {String}
 */
function createTalicImage(id, talicNumber) {
    return '<img src="includes/templates/assets/images/talic/t-' + talicNumber + '.png" alt="" id="' + id + '">';
}

/**
 * Generates the hex representation of our upgrades
 * @param ID
 * @param inputId
 */
function modifyHexValue(ID, inputId) {
    var hex = '';
    var decValue;
    var totalUpgrades = upgrades[ID].length;

    // Run through our upgrades and convert it to hex
    for (var x = 0; x < totalUpgrades; x++) {
        hex = parseInt(upgrades[ID][x]).toString(16) + hex;
    }

    // Pad the hex value
    hex = ("fffffff" + hex).slice(-7);
    hex = (totalUpgrades).toString() + hex;

    // Create our decimal value
    decValue = parseInt(hex, 16);

    // Set the input value
    $('#' + inputId).val(decValue);
}