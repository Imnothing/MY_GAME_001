import { ConfigReader } from "../../../mainbundle/scripts/Data/ConfigReader";
import { FightPet } from "../../../mainbundle/scripts/Data/FightPet";
import { SkillConfig } from "../../../mainbundle/scripts/Datatable/SkillConfig";

export class FightPetManager {
    recoverHp(pet: FightPet, hp?: number) {
        if (pet.battleValue.hp == pet.battleValue.max_hp) return false;
        pet.battleValue.hp = pet.battleValue.hp + hp >= pet.battleValue.max_hp ? pet.battleValue.max_hp : pet.battleValue.hp + hp
        return true;
    }

    recoverPP(pet: FightPet, pp?: number) {
        {
            for (let key in pet.skills) {
                let skill: SkillConfig = ConfigReader.readSkillConfig(key);
                pet.skills[key] = pet.skills[key] + pp >= skill.PP ? skill.PP : pet.skills[key] + pp
            }

        }
        return true;
    }

    // refreshBattleLevel(pet: FightPet) {
    //     pet.battleLevel = new BattleLevel();
    // }
}