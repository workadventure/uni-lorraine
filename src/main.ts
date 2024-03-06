/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    const mapUrl = WA.room.mapURL
    const root = mapUrl.substring(0, mapUrl.lastIndexOf("/"))
    let currentMapName = "campus"

    if(WA.player.tags.includes("admin")) {
        WA.player.setOutlineColor(0, 119, 141);
    }

    WA.ui.actionBar.addButton({
        id: 'move-btn',
        type: 'action',
        imageSrc: root + '/arrows-to-center.svg',
        toolTip: "M'envoyer à l'accueil",
        callback: () => {
            WA.nav.goToRoom("https://play.workadventu.re/@/universite-de-lorraine/pleiades/accueil#moveTo=accueil")
        }
    });
    
    WA.ui.actionBar.addButton({
        id: 'plan-btn',
        type: 'action',
        imageSrc: root + '/map-plan.svg',
        toolTip: "Ouvrir le plan",
        callback: () => {
            WA.ui.modal.openModal({
                title: "Plan",
                src: `${root}/map-overview/index.html?image=${currentMapName}-overview.png`,
                allowApi: false,
                allow: "microphone; camera",
                position: "center",
            }, () => WA.ui.modal.closeModal())
        }
    });
    WA.ui.actionBar.addButton({
        id: 'program-btn',
        type: 'action',
        imageSrc: root + '/program-schedule.svg',
        toolTip: "Ouvrir le programme de la journée",
        callback: () => {
            WA.ui.modal.openModal({
                title: "Plan",
                src: 'https://workadventu.re',
                allowApi: false,
                allow: "microphone; camera",
                position: "center",
            }, () => WA.ui.modal.closeModal())
        }
    });

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
        // Update current map name
        currentMapName = WA.state.loadVariable('mapName') as string;
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

export {};
