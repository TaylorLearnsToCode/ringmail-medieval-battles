import { TROOP_TYPES, TROOP_WEIGHTS } from './rmb-constants.mjs';

export class RmbActorSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['rmb-global', 'sheet', 'actor'],
      template:
        'systems/ringmail-medieval-battles/templates/rmb-actor-sheet.html',
      width: 600,
      height: 600
    });
  }

  /** @override */
  getData() {
    const context = super.getData();
    context.sheetData = context.data.data;
    context.sheetItems = context.data.items;
    context.TROOP_WEIGHTS = TROOP_WEIGHTS;
    context.TROOP_TYPES = TROOP_TYPES;
    return context;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    html.find('.special-rule').click(event => {
      event.preventDefault();
      switch (event.currentTarget.dataset.action) {
        case 'add':
          this._addSpecial();
          break;
        case 'remove':
          this._removeSpecial(event.currentTarget.dataset.target);
          break;
      }
    });

    html.find('.special-rule-input').change(event => {
      event.preventDefault();
      const special = this.actor.items.get(event.currentTarget.dataset.target);
      const toUpdate =
        event.currentTarget.dataset.field == 'name'
          ? 'name'
          : 'data.description';
      special.update({
        [toUpdate]: event.currentTarget.value
      });
    });
  }

  _addSpecial() {
    const special = getDocumentClass('Item');
    special.create(
      {
        name: 'New Special Rule',
        type: 'special'
      },
      { parent: this.actor }
    );
  }

  _removeSpecial(target) {
    if (!!target) {
      const item = this.actor.items.get(target);
      item.delete();
    } else {
      throw new Error('No removal target specified');
    }
  }
}
