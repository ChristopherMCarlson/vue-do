<template>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-row justify="center">
            <v-col cols="12">
              <p class='text-h4'>Great! Now lets start personalizing your webiste!</p>
              <br />
              <v-text-field
              v-model="siteName"
              label="Website Name"
              required
            ></v-text-field>
            <v-select
              :items="siteTypes"
              v-model="siteType"
              label="Website Type"
            ></v-select>
            <p class='text-h6'>Customize your colors(Optional)</p>
              <v-row
                justify="space-around"
                align="center"
              >
              <v-col cols="6">
                <v-text-field v-model="colors[0]" hide-details class="ma-0 pa-0" solo>
                    <template v-slot:append>
                      <v-menu v-model="colorPicker1" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
                        <template v-slot:activator="{ on }">
                          <div :style="swatchStyle1" v-on="on" />
                        </template>
                        <v-card>
                          <v-card-text class="pa-0">
                            <v-color-picker v-model="colors[0]" flat />
                          </v-card-text>
                        </v-card>
                      </v-menu>
                    </template>
                  </v-text-field>
              </v-col>
              <v-col cols="6">
                  <v-text-field v-model="colors[1]" hide-details class="ma-0 pa-0" solo>
                      <template v-slot:append>
                        <v-menu v-model="colorPicker2" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
                          <template v-slot:activator="{ on }">
                            <div :style="swatchStyle2" v-on="on" />
                          </template>
                          <v-card>
                            <v-card-text class="pa-0">
                              <v-color-picker v-model="colors[1]" flat />
                            </v-card-text>
                          </v-card>
                        </v-menu>
                      </template>
                    </v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field v-model="colors[2]" hide-details class="ma-0 pa-0" solo>
                        <template v-slot:append>
                          <v-menu v-model="colorPicker3" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
                            <template v-slot:activator="{ on }">
                              <div :style="swatchStyle3" v-on="on" />
                            </template>
                            <v-card>
                              <v-card-text class="pa-0">
                                <v-color-picker v-model="colors[2]" flat />
                              </v-card-text>
                            </v-card>
                          </v-menu>
                        </template>
                      </v-text-field>
                  </v-col>
                  <v-col cols="6">
                      <v-text-field v-model="colors[3]" hide-details class="ma-0 pa-0" solo>
                          <template v-slot:append>
                            <v-menu v-model="colorPicker4" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
                              <template v-slot:activator="{ on }">
                                <div :style="swatchStyle4" v-on="on" />
                              </template>
                              <v-card>
                                <v-card-text class="pa-0">
                                  <v-color-picker v-model="colors[3]" flat />
                                </v-card-text>
                              </v-card>
                            </v-menu>
                          </template>
                        </v-text-field>
                    </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row justify="center">
            <v-col cols="12">
                <v-card
                  style="margin-left: 13.5%;"
                  width="75%"
                  :color="colors[3]"
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
                <v-container
                  id="scroll-target"
                  style="max-height: 50vh"
                  class="overflow-y-auto"
                  fluid
                >
                <v-row justify="space-between">
                  <v-col cols="4" v-for="image in images" v-if="siteType == 'Photography Portfolio' || siteType == ''">
                    <v-img
                    class='mx-auto'
                    width="100%"
                    :src="image"></v-img>
                  </v-col>
                  <v-col cols="12" v-for="post in posts" v-if="siteType == 'Blog'">
                      <v-card
                      class="mx-auto"
                      max-width="100%"
                    >
                      <v-img
                        class="white--text align-end"
                        :src="post.image"
                        height="10vh"
                      >
                        <v-card-title>{{post.title}}</v-card-title>
                      </v-img>
                      <v-card-text class="text--primary">
                        <div>{{post.content}}</div>
                      </v-card-text>
                  
                      <v-card-actions>
                        <v-btn
                          :color="colors[1]"
                          small
                        >
                          Share
                        </v-btn>
                  
                        <v-btn
                          :color="colors[2]"
                          small
                        >
                          Explore
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
                </v-container>
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
      colorPicker1: false,
      colorPicker2: false,
      colorPicker3: false,
      colorPicker4: false,
      mask1: '!#XXXXXXXX',
      mask2: '!#XXXXXXXX',
      mask3: '!#XXXXXXXX',
      mask4: '!#XXXXXXXX',
      images: [
        'https://picsum.photos/200',
        'https://picsum.photos/300',
        'https://picsum.photos/400',
        'https://picsum.photos/250',
        'https://picsum.photos/350',
        'https://picsum.photos/450',
        'https://picsum.photos/225',
        'https://picsum.photos/325',
        'https://picsum.photos/425',
        'https://picsum.photos/275',
        'https://picsum.photos/375',
        'https://picsum.photos/475',
      ],
      posts: [
        {
          image: 'https://picsum.photos/200',
          title: 'A cool post!',
          content: 'What cool content!'
        },
        {
          image: 'https://picsum.photos/300',
          title: 'A cooler post!',
          content: 'What cooler content!'
        },
        {
          image: 'https://picsum.photos/400',
          title: 'More posts',
          content: 'More content! Wow!'
        },
        {
          image: 'https://picsum.photos/250',
          title: 'Another post',
          content: 'Wow! All this content!'
        },
        {
          image: 'https://picsum.photos/350',
          title: 'So many posts!',
          content: 'So much content!'
        },
        {
          image: 'https://picsum.photos/450',
          title: 'Last post!',
          content: 'Great content!'
        },
      ],
      siteTypes: [
        'Photography Portfolio',
        'Blog',
      ],
      siteType: ''
    }),
    computed: {
      colors () {
        return this.$store.state.selectedColors;
      },
      swatchStyle1() {
        const { colors, menu } = this
        return {
          backgroundColor: colors[0],
          cursor: 'pointer',
          height: '30px',
          width: '30px',
          borderRadius: menu ? '50%' : '4px',
          transition: 'border-radius 200ms ease-in-out'
        }
      },
      swatchStyle2() {
        const { colors, menu } = this
        return {
          backgroundColor: colors[1],
          cursor: 'pointer',
          height: '30px',
          width: '30px',
          borderRadius: menu ? '50%' : '4px',
          transition: 'border-radius 200ms ease-in-out'
        }
      },
      swatchStyle3() {
        const { colors, menu } = this
        return {
          backgroundColor: colors[2],
          cursor: 'pointer',
          height: '30px',
          width: '30px',
          borderRadius: menu ? '50%' : '4px',
          transition: 'border-radius 200ms ease-in-out'
        }
      },
      swatchStyle4() {
        const { colors, menu } = this
        return {
          backgroundColor: colors[3],
          cursor: 'pointer',
          height: '30px',
          width: '30px',
          borderRadius: menu ? '50%' : '4px',
          transition: 'border-radius 200ms ease-in-out'
        }
      },
    }
  }
</script>