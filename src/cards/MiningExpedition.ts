
import { IProjectCard } from "./IProjectCard";
import { CardType } from "./CardType";
import { Tags } from "./Tags";
import { Player } from "../Player";
import { Game } from "../Game";
import { SelectPlayer } from "../inputs/SelectPlayer";

export class MiningExpedition implements IProjectCard {
    public cost: number = 12;
    public tags: Array<Tags> = [];
    public cardType: CardType = CardType.EVENT;
    public name: string = "Mining Expedition";
    public text: string = "Raise oxygen 1 step. Remove 2 plants from any player. Gain 2 steel.";
    public description: string = "Ruthlessly excavating rich areas.";
    public play(player: Player, game: Game): Promise<void> {
        return new Promise((resolve, reject) => {
            player.setWaitingFor(new SelectPlayer(this, game.getPlayers()), (options: {[x: string]: string}) => {
                const foundPlayer = game.getPlayer(options.option1);
                if (foundPlayer === undefined) {
                    reject("Player not found");
                    return;
                }
                game.increaseOxygenLevel(player)
                    .then(function () {
                        foundPlayer.plants = Math.max(0, foundPlayer.plants - 2);
                        player.steel += 2;
                        resolve();
                    })
                    .catch(function (err: string) {
                        reject(err);
                    });
            });
        });
    }
}