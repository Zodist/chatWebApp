<template>
  <v-container grid-list-xs fluid>
    <!-- <v-form> -->
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6">
        <v-card>
          <v-list>
            <v-subheader>ROOM LISTS</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(chatRoom, index) in chatRooms"
                :key="index"
                @click="enterRoom(chatRoom)"
              >
                <v-list-item-content>
                  <v-list-item-subtitle>{{chatRoom.name}} // {{chatRoom.userCount}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-btn fab color="cyan accent-2" right absolute @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-text>
          <v-text-field @keydown.enter="makeChatRoom" v-model="chatRoomName" label="Room name"></v-text-field>
          <!-- <small class="grey--text">* This doesn't actually save.</small> -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="chatRoomName === ''" text color="primary" @click="makeChatRoom">Make</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    chatRooms: [],
    chatRoomName: "",
    roomId: "",
    dialog: false
  }),
  created() {
    this.findAllRoom();

    // TEST
    this.$http.get("/api/chat/userName").then(Response => {
      let userName = Response.data;
      localStorage.setItem("userName", userName);
    })
  },
  methods: {
    enterRoom(chatRoom) {
      localStorage.setItem("wschat.roomId", chatRoom.roomId);
      localStorage.setItem("wschat.roomName", chatRoom.name);
      this.$router.push("/chatRoom");
    },
    findAllRoom() {
      this.$http.get("/api/chat/rooms").then(Response => {
        this.chatRooms = Response.data;
        console.log('chatRoomList : ', this.chatRooms)
      });
    },
    makeChatRoom() {
      var params = new URLSearchParams();
      params.append("name", this.chatRoomName);
      this.$http
        .post("/api/chat/room", params)
        .then(response => {
          alert(response.data.name + "방 개설에 성공하였습니다.");
          this.chatRoomName = "";
          this.findAllRoom();
        })
        .catch(response => {
          alert("채팅방 개설에 실패하였습니다.");
        });
      this.dialog = false;
    }
  }
};
</script>