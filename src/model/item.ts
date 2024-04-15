/**
 * Some items are booleans (either you have it or you don't) such as boomerang, hover boots, and hammer
 * Some items are meaninglessly progressive (progressive, but no checks are blocked by the different levels) such as bow, bomb bag, and magic
 *   - Do we need to differentiate between booleans and meaninglessly progressive items?
 * Some items are meaningfully progressive (different lengths or intensities block different checks) such as strength and hookshot
 *   - Do we make different requirements for each? Or do we use a `count` instead of `complete`?
 */
export class Item {
    private static readonly _allItems: Item[] = [];

    constructor(
        public readonly name: string,
        public readonly max: number = 1,
    ) {
        Item._allItems.push(this);
    }

    public static readonly BombBag = new Item('Bomb bag');
    public static readonly Bow = new Item('Bow');
    public static readonly FireArrows = new Item('Fire arrows');
    public static readonly LightArrows = new Item('Light arrows');
    public static readonly DinsFire = new Item("Din's Fire");
    public static readonly KokiriSword = new Item('Kokiri sword');
    public static readonly Slingshot = new Item('Slingshot');
    public static readonly Hookshot = new Item('Hookshot', 2);
    public static readonly MirrorShield = new Item('Mirror shield');
    public static readonly Boomerang = new Item('Boomerang');
    public static readonly LensOfTruth = new Item('Lens of Truth');
    public static readonly MegatonHammer = new Item('Megaton hammer');
    public static readonly GoronTunic = new Item('Goron tunic');
    public static readonly ZoraTunic = new Item('Zora tunic');
    public static readonly Wallet = new Item('Wallet', 2);
    public static readonly Bottle = new Item('Bottle');
    public static readonly RutosLetter = new Item("Ruto's Letter");
    public static readonly IronBoots = new Item('Iron boots');
    public static readonly HoverBoots = new Item('Hover boots');
    public static readonly Scale = new Item('Scale', 2);
    public static readonly Magic = new Item('Magic');
    public static readonly Strength = new Item('Strength', 3);

    public static readonly allItems: ReadonlyArray<Item> = this._allItems.sort((a, b) => a.name.localeCompare(b.name));
    public static get(itemName: string | undefined): Item | undefined {
        return Item.allItems.find((item) => item.name === itemName);
    }
}

// Song, Song Check?

// Medallion/Stone/Dungeon reward?

// Hints/Gossip stones
