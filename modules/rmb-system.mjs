import { RmbActorSheet } from './rmb-actor-sheet.mjs';
import { RmbActor } from './rmb-actor.mjs';

/** Init Function */
Hooks.once('init', function () {
  CONFIG.Actor.documentClass = RmbActor;

  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('rmb', RmbActorSheet, { makeDefault: true });

  Handlebars.registerHelper('nTimes', function (n, block) {
    var accum = '';
    for (var i = 0; i < n; ++i) {
      accum += block.fn(i);
    }
    return accum;
  });

  return loadTemplates([]);
});
