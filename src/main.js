/*
WRITTEN BY: Jordan Shen
PROJECT TITLE: VACCINE PATROL
DATE: 4/20/2021
DURATION: ~7 Hours
*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config);
// reserve keyboard vars
let keyS, keySPACE, keyA, keyD, keyJ, keyK, keyL;

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

/*
MODS:

1.Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
I created all new sprites as well as sound effects in aseprite and bfxr respectively. I altered the UI colors accordingly to fit with the theme.

2. Implement a simultaneous two-player mode (30)
Due to the control implementations in Rocket.js, I felt it best to make a whole new cloned class for the second player, Rocket2. I added extra keys
and scores that were necessary for the second player to function and have their own score.

3. Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20)
Upon calling the function shipExplode (and now shipExplode2 with the second player), the time elapsed is subtracted
by a small amount, increasing play time. I had to fiddle around with the time alot, as it was very easy for games to become
virtually infinite.
*/