<template>
  <v-container grid-list-xs fluid>
    <v-layout column>
      <v-flex>
        {{roomName}} : {{userCount}}
      </v-flex>
      <v-flex>
        <div style="overflow:auto; height:70vh;">
          <!-- <v-card style="overflow:auto; height:80vh;"> -->
          <v-list three-line>
            <template v-for="(message, index) in messages">
              <v-list-item class="item" :key="index">
                <v-list-item-content v-if="message.type === 'ENTER'">
                  <v-list-item-title
                    style="text-align:center;"
                  >{{message.sender}} : {{message.message}}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-content v-else>
                  <v-list-item-title v-if="message.sender !== sender">{{message.sender}}</v-list-item-title>
                  <v-list-item-subtitle>
                    <div>
                      <v-row
                        style="margin-left:0px; margin-right:0px;"
                        :style="rowStyle(message.sender, sender)"
                      >
                        <div class="itemContents">{{message.message}}</div>
                      </v-row>
                    </div>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
          <!-- </v-card> -->
        </div>
      </v-flex>
      <v-layout row wrap>
        <v-flex>
          <v-text-field outlined rounded v-model="message" @keydown.enter="sendMessage('TALK')"></v-text-field>
        </v-flex>
        <v-flex>
          <v-btn rounded color="primary" dark>send</v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
// import SockJS from 'sockjs'
import Stomp from "stompjs";
export default {
  data: () => ({
    // WebSocket Variable
    sock: null,
    ws: null,
    reconnect: 0,

    content: "",
    roomId: "",
    room: {},
    message: "",
    messages: [],

    token: "",
    sender: "",
    roomName: "",
    userCount: 0
  }),
  created() {
    // this.findRoom();
    this.init();
    this.connect();
  },
  computed: {},
  methods: {
    rowStyle(s1, s2) {
      if (s1 === s2) {
        // console.log("!!!SAME SENDER!!!");
        return {
          justifyContent: "flex-end"
          // marginLeft: '0px',
          // marginRight: '0px'
        };
      }
      return {};
    },
    init() {
      this.roomId = localStorage.getItem("wschat.roomId");
      this.sender = localStorage.getItem("userName");
      this.roomName = localStorage.getItem("wschat.roomName");
    },
    wsConnect() {
      // websocket &amp; stomp initialize
      this.sock = new WebSocket("ws://localhost:4000/ws-stomp/websocket");
      this.ws = Stomp.over(this.sock);
      this.reconnect = 0;

      let vm = this;
      this.ws.connect(
        { token: vm.token },
        function(frame) {
          vm.ws.subscribe("/sub/chat/room/" + vm.roomId, function(message) {
            var recv = JSON.parse(message.body);
            vm.recvMessage(recv);
          });
          vm.$nextTick(function() {
            vm.sendMessage("ENTER");
          });
        },
        function(error) {
          alert("서버 연결에 실패 하였습니다. 다시 접속해 주십시요.");
          vm.$router.push("/chatRoom");
        }
      );
    },
    connect() {
      let vm = this;
      this.$http.get("/api/chat/user").then(response => {
        vm.token = response.data.token;
        vm.wsConnect();
      });
    },
    findRoom() {
      this.$http.get("/api/chat/room/" + this.roomId).then(response => {
        this.room = response.data;
      });
    },
    sendMessage(type) {
      this.ws.send(
        "/pub/chat/message",
        { token: this.token },
        JSON.stringify({
          type: type,
          roomId: this.roomId,
          sender: this.sender,
          message: this.message
        })
      );
      this.message = "";
    },
    recvMessage(recv) {
      console.log('recv Message : ', recv)
      this.userCount = recv.userCount;
      this.messages.push({
        type: recv.type,
        sender: recv.type == "ENTER" ? "[알림]" : recv.sender,
        message: recv.message
      });
    }
  }
};
</script>

<style scoped>
.item {
  min-height: auto;
}
.itemContents {
  padding: 10px 20px;
  border-radius: 28px;
  max-width: 80%;
  background-color: lightgoldenrodyellow;
}
</style>