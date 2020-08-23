<template>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-row justify="center">
            <v-col cols="12">
              <p>Great! Now lets start personalizing your webiste!</p>
              <br />
              <v-text-field
              v-model="siteName"
              label="Website Name"
              required
            ></v-text-field>
            <v-select
              :items="siteTypes"
              label="Website Type"
            ></v-select>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row justify="center">
            <v-col cols="12">
                <v-card
                style="margin-left: 13.5%;"
                width="75%"
              >
                  <div v-if="siteName == ''" v-bind:style="{backgroundColor: colors[0]}" style="height: 1.5rem; padding-top: .25rem; text-align: start; padding-left: .5rem;">
                    <p style="line-height: 1rem; margin-left: 0px">
                      <v-icon style="margin-top: -.25rem;">mdi-menu</v-icon>
                      Your Website Name
                    </p>
                  </div>
                  <div v-else v-bind:style="{backgroundColor: colors[0]}" style="height: 1.5rem; padding-top: .25rem; text-align: start; padding-left: .5rem;">
                    <p style="line-height: 1rem; margin-left: 0px">
                      <v-icon style="margin-top: -.25rem;">mdi-menu</v-icon>
                      {{siteName}}
                    </p>
                  </div>
                  <v-row justify="space-between">
                    <v-col cols="4" v-for="image in images">
                      <v-img
                      style="margin-left: 13.5%;"
                      width="75%"
                      :src="image"></v-img>
                    </v-col>
                  </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </template>

<script>
  export default {
    name: 'Branding',

    data: () => ({
      siteName: '',
      images: [
        'https://picsum.photos/200',
        'https://picsum.photos/300',
        'https://picsum.photos/400',
        'https://picsum.photos/250',
        'https://picsum.photos/350',
        'https://picsum.photos/450',
      ],
      siteTypes: [
        'Photography Portfolio',
        'Blog',
      ]
    }),
    computed: {
      colors () {
        return this.$store.state.selectedColors;
      }
    }
  }
</script>