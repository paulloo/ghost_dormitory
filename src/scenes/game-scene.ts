import { Input } from 'phaser';
import { getGameWidth, getGameHeight } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

let container;
export class GameScene extends Phaser.Scene {
  public speed = 200;

  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private image: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super(sceneConfig);
  }

  public create(): void {
    this.anims.create({ key: 'fly', frames: this.anims.generateFrameNumbers('chick', {frames: [0, 1, 2, 3]}), frameRate: 5, repeat: -1 });

    this.add.image(320, 256, 'backdrop').setScale(2);

    var cannonHead = this.add.image(130, 416, 'cannon_head').setDepth(1);
    var cannon = this.add.image(130, 464, 'cannon_body').setDepth(1);

    
    
    var cannonHeadEnemy = this.physics.add.staticImage(530, 416, 'cannon_head').setDepth(1);
    var cannonEnemy = this.add.image(530, 464, 'cannon_body').setDepth(1);

    var chick = this.physics.add.sprite(cannon.x, cannon.y - 50, 'chick').setScale(2);
    var gfx = this.add.graphics().setDefaultStyles({ lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 } });
    var line = new Phaser.Geom.Line();
    var angle = 0;

    chick.setCollideWorldBounds(true)

    this.physics.add.collider(chick, cannonHeadEnemy);


    chick.disableBody(true, true);

    this.input.on('pointermove', function (pointer) {
        angle = Phaser.Math.Angle.BetweenPoints(cannon, pointer);
        cannonHead.rotation = angle;
        Phaser.Geom.Line.SetToAngle(line, cannon.x, cannon.y - 50, angle, 128);
        gfx.clear().strokeLineShape(line);
    }, this);

    this.input.on('pointerup', function () {
        chick.enableBody(true, cannon.x, cannon.y - 50, true, true);
        chick.play('fly');
        this.physics.velocityFromRotation(angle, 600, chick.body.velocity);
    }, this);
  }

  public update(): void {

  }
}
