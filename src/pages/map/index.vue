<template>
    <div>
        <map :latitude="position.latitude" :longitude="position.longitude" :markers="position.markers" :show-location="true" style="width:100vw;height:100vh"></map>
    </div>
</template>

<script>
export default {
  onLoad(query) {
    let _position = {
      latitude: query.latitude,
      longitude: query.longitude,
      shown: false,
      markers: [
        {
          id: 1,
          latitude: query.latitude,
          longitude: query.longitude,
          name: query.name
        }
      ]
    };
    this.position = _position;
  },
  data() {
    return {
      position: {
        latitude: 23.099994,
        longitude: 113.32452,
        shown: false,
        markers: [
          {
            id: 1,
            latitude: 23.099994,
            longitude: 113.32452,
            name: "T.I.T 创意园"
          }
        ]
      }
    };
  },
  methods: {
    onKonwnClick() {
      this.$emit("onKonwnClick");
    }
  }
};
</script>

<style lang="less" scoped>
</style>
