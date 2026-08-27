# Next-Gen Pachislot Expression Lab

Design Lab independent technical proof-of-concept for evaluating browser-based pachislot realism on iPhone Safari.

## Isolation

- Path: `research/nextgen_pachislot_expression_lab/`
- Existing Design Lab editor is not imported or modified.
- Existing `research/phaser4_pachislot_demo/` is preserved as the earlier comparison baseline.
- No Chappy5 dependency and no Scheduled Development integration.

## v0.1 objective

Evaluate one complete, intentionally short 1G presentation instead of an effect gallery:

`BET -> START -> reel spin -> STOP1 -> STOP2 -> STOP3 -> silence/dark beat -> character/mechanism response -> light/particle release -> BONUS`

The result is deterministic in this research build. Probability, payout and production game logic are intentionally out of scope.

## Architecture

A single JavaScript `TIMELINE` owns the important game events. Visual, reel, cabinet LED and audio responses are called from those events. They are not separate animations started independently by unrelated timers.

The only delayed calls inside the STOP3 judgement are subordinate beats of that same judgement event.

## Selected technology for v0.1

- Phaser 4.2.1 (CDN): WebGL/Canvas renderer, Scene, Camera, Tween, display layers
- Procedural Phaser graphics: no image asset dependency in the first build
- Lightweight pooled particle objects: controlled particle-like motion without a large emitter system
- CSS cabinet rendering: material depth, glass/bezel, physical controls, cabinet light spill
- Native Web Audio API: BET / START / STOP / omen / silence beat / BONUS synthesis
- requestAnimationFrame FPS display for quick iPhone observation
- in-page Game Event / Audio Event log for human QA

## Deferred until justified

Not added merely to increase the technology count:

- Tone.js / Howler.js: native Web Audio is enough for the first synchronization experiment
- custom Shader / PostFX: evaluate the current FULL uplift and Safari load first
- FFmpeg: no generated media pipeline yet
- Playwright / GitHub Actions: planned after the static prototype is confirmed to load correctly from GitHub Pages

## BASIC vs FULL

Both modes use the same interaction and deterministic hit result.

BASIC intentionally keeps presentation close to conventional simple state changes.

FULL adds staged camera movement, character part motion, ambient particles, lighting escalation, cabinet spill, a silence beat, virtual mechanism movement and a larger synchronized hit release.

## Character scope

The original character is procedural and split into multiple parts (coat, torso, head, hair, eye, arm, weapon, aura). Idle breathing, blinking and hair movement are included. It is intentionally not a general-purpose character animation system.

## Audio note for iPhone Safari

AudioContext is unlocked by the first BET user gesture. This is intentional for Safari autoplay restrictions.

## Human evaluation points

1. Does the FULL mode feel materially more like a physical pachislot machine than BASIC?
2. Is reel acceleration/stopping readable rather than merely flashy?
3. Does STOP1 -> STOP2 -> STOP3 increase tension in stages?
4. Does the silent/dark judgement beat create useful "間"?
5. Do cabinet lights feel like illumination/spill rather than colored lines?
6. Does the virtual mechanism feel weighted enough?
7. Does audio feel authored as part of the event sequence?
8. Is touch response comfortable on iPhone Safari?
9. Does FPS remain stable and does the device avoid obviously excessive load/heat?

## Status

`NEXTGEN_EXPRESSION_POC_V0_1 / NEEDS_IPHONE_SAFARI_HUMAN_EVALUATION`
