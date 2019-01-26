
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";

export class GeothermalPower implements IProjectCard {
    public cost: number = 11;
    public tags: Array<Tags> = [Tags.ENERGY, Tags.STEEL];
    public cardType: CardType = CardType.AUTOMATED;
    public name: string = "Geothermal Power";
    public text: string = "Increase your energy production 2 steps.";
    public description: string = "Utilizing heat from the core through the cracks in the crust.";
    public play(player: Player, _game: Game): Promise<void> {
        player.energyProduction += 2;
        return Promise.resolve();
    }
}