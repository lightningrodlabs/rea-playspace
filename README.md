# REA Playspace

[![CI](https://github.com/lightningrodlabs/rea-playspace/actions/workflows/test.yml/badge.svg)](https://github.com/lightningrodlabs/rea-playspace/actions/workflows/test.yml)
[![CI](https://github.com/lightningrodlabs/rea-playspace/actions/workflows/release.yml/badge.svg)](https://github.com/lightningrodlabs/rea-playspace/actions/workflows/release.yml)

The REA Playspace is a graphical interface that lets people play with the concepts behind [Valueflows](https://www.valueflo.ws/).

![](./docs/assets/demo_flow.png)

To speed up ones understanding of the concpepts behind [Valueflows](https://www.valueflo.ws/), below is the same graphical interface with annotations where the final output resource is Tacos.

![](./docs/assets/demo_flow_with_annotations.png)

## Installing

### Prerequisites

1. Download the latest rea-playspace.webhapp file from the [releases page](https://github.com/lightningrodlabs/rea-playspace/releases).
2. Make sure you are using the [Holochain Launcher](https://github.com/holochain/launcher/releases/) specified in the release notes for the version of REA Playspace you downloaded.

### Instructions

1. Open the Holochain Launcher<br/><img width="179" alt="Screen Shot 2022-10-23 at 21 00 57" src="https://user-images.githubusercontent.com/102320/197433087-905b8447-57cc-406a-afd9-69c4860e98ba.png">
2. Click "+ Install New App".<br/><img width="257" alt="Screen Shot 2022-10-23 at 21 02 14" src="https://user-images.githubusercontent.com/102320/197433213-9d6b3175-e8a1-48d8-84e6-816558d12d65.png">
3. Click "Select App From Filesystem".<br/><img width="377" alt="Screen Shot 2022-10-23 at 21 02 43" src="https://user-images.githubusercontent.com/102320/197433251-6768811d-598c-49e1-946d-0b58875e603b.png">
4. Select the downloaded rea-playspace.webhapp and click "Open".<br/><img width="261" alt="Screen Shot 2022-10-23 at 21 05 54" src="https://user-images.githubusercontent.com/102320/197433742-a8cf9348-6dab-41e8-9e79-5b0b8c65793c.png">
5. In the "Install To Holochain Version" field select the version specified in the release notes for the version of REA Playspace you downloaded. It will likely be different from what's in the picture below.<br/><img width="576" alt="Screen Shot 2022-10-23 at 21 08 09" src="https://user-images.githubusercontent.com/102320/197434327-8cd3fd14-9c64-4183-bc8e-44c04fecb0ab.png">
6. In advanced settings, add a "Network Seed" that you can share with others to make sure your playspace data stays private. You may think of this as a password to your playspace data.<br/><img width="587" alt="Screen Shot 2022-10-23 at 21 12 40" src="https://user-images.githubusercontent.com/102320/197435310-c572aec1-0de7-4db7-a919-0b3a8a715445.png">
7. Click "INSTALL APP". <br/><img width="159" alt="Screen Shot 2022-10-23 at 21 15 45" src="https://user-images.githubusercontent.com/102320/197435619-44e970c1-4abb-4380-ab2c-341692316d6b.png">
8. If you're the first peson to start up the playspace with this network seed, then go ahead and open the app by clicking "OPEN".<br/><img width="616" alt="Screen Shot 2022-10-23 at 21 17 02" src="https://user-images.githubusercontent.com/102320/197435750-31b9e891-6cbc-4ed3-916a-91641204fb7e.png">
9. If you're not the first person, it's best to wait a day with the Holochain Launcher running to make sure you have sync'ed the data over from the first person to create the network (the network with the specific network seed you're using). This is due to issue #172. 

### Notes

Sometimes, when the holochain version or the zome code used in our app changes, the data you have in the app will no longer be accessible. This is because the network created be Holochain depends on many factors including those versions, the hashes of the integrity zomes, and the network seed.

This is pre production software. We hope to get to a stable release soon, but please do not rely on this software to work consistently. It is currently moving fast and we are attempting to create a stable UI that works for many possible situations, but still lets people understand the Valuflows data model. So it is still low level. It is also a prototyping environment for needed client libraries for developing applications with Valueflows, Holochain, and, eventually, hREA.

## Developers

If you are a developer, check out the [Developer docs](./DEVELOP.md).


## User Documentation

User doc for the REA Playspace can be found [here](https://hackmd.io/@valueflows/H1TL7_Xo5).

