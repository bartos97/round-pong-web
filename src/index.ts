/**
 * Webpack entry point file
 */

require('./sass/main.scss');

require('./app/components/dialog/dialog.module.ts');
require('./app/components/home-screen/home-screen.module.ts');
require('./app/components/game-screen/game-screen.module.ts');
require('./app/game/interfaces.ts');
require('./app/game/ball.ts');
require('./app/game/player.ts');
require('./app/game/game-manager.ts');

require('./app/core/maths/vector2D.ts');
require('./app/core/maths/vector-utils.ts');
