<template>
  <v-row class="text-center">
    <v-col cols="12">
      <v-img
        :src="require('../assets/logo.svg')"
        class="my-3"
        contain
        height="200"
      />
    </v-col>
  
    <v-col cols="12" class="mb-4">
      <h1 class="display-2 font-weight-bold mb-3">
        Welcome to Vue-Builder
      </h1>
  
      <p class="subheading font-weight-regular">
        To begin building your website,
        <br>please select a color palette
      </p>
    </v-col>
    <v-col cols="12">
      <v-row justify="space-between">
        <v-col cols='4' v-for="palette in palettes">
            <v-card
            style="margin-left: 13.5%;"
            width="75%"
          >
            <v-card-text>
              <p class="display-1 text--primary">
                {{palette.title}}
              </p>
              <div v-bind:style="{backgroundColor: palette.colors[0]}" style="width: 75%; margin-left: 12.5%; height: 3.5rem; padding-top: 1.25rem;">
                <p style="background-color: rgba(255, 255, 255, 0.534); width: 50%; margin-left: 25%; line-height: 1rem;">
                  {{palette.colors[0]}}
                </p>
              </div>
              <div v-bind:style="{backgroundColor: palette.colors[1]}" style="width: 75%; margin-left: 12.5%; height: 3rem; padding-top: 1rem;">
                <p style="background-color: rgba(255, 255, 255, 0.534); width: 50%; margin-left: 25%; line-height: 1rem;">
                  {{palette.colors[1]}}
                </p>
              </div>
              <div v-bind:style="{backgroundColor: palette.colors[2]}" style="width: 75%; margin-left: 12.5%; height: 2rem; padding-top: .5rem;">
                <p style="background-color: rgba(255, 255, 255, 0.534); width: 50%; margin-left: 25%; line-height: 1rem;">
                  {{palette.colors[2]}}
                </p>
              </div>
              <div v-bind:style="{backgroundColor: palette.colors[3]}" style="width: 75%; margin-left: 12.5%; height: 1.5rem; padding-top: .25rem;">
                <p style="background-color: rgba(255, 255, 255, 0.534); width: 50%; margin-left: 25%; line-height: 1rem;">
                  {{palette.colors[3]}}
                </p>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="deep-purple accent-4"
                @click="selectColor(palette.colors)"
              >
                Select This Palette
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  </template>
  
  <script>
    export default {
      name: 'Home',
  
      data: () => ({
        palettes: [
          {
            title: 'Evening Sky',
            colors: ['#1a1a2e', '#16213e', '#0f3460', '#e94560']
          },
          {
            title: 'Maritime',
            colors: ['#005874', '#1c819e', '#e6e6d4', '#ffbe00']
          },
          {
            title: 'Pastel Wash',
            colors: ['#776d8a', '#f3e6e3', '#dbe3e5', '#d3c09a']
          },
          {
            title: 'Morning Beach',
            colors: ['#e8505b', '#f9d56e', '#f3ecc2', '#14b1ab']
          },
          {
            title: 'Midnight Blues',
            colors: ['#1b262c', '#0f4c75', '#3282b8', '#bbe1fa']
          },
          {
            title: 'Purple Haze',
            colors: ['#6f4a8e', '#221f3b', '#050505', '#ebebeb']
          },
        ]
      }),
      methods: {
        selectColor(colorArray) {
          this.$store.dispatch('selectColor', colorArray).then(() => {
            this.$router.push('branding');
          })
        }
      }
    }
  </script>
  