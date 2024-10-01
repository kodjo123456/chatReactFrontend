import React from 'react';
import AddGroup from '../dialogueBox/AddGroup';
import AddMember from '../dialogueBox/AddMember';
import Dede from '../dede/Dede';
import "./menu.css";
// import { ChatFooter, ChatHeader } from '../chat';
// import Dede from '../dede/Dede'

export default function Menu() {
  return (
    <div>
      <div className='dedeza'>
        <AddGroup />
        <AddMember />
      </div>
      <div>
        <Dede />
        {/* <Footer />
        <Header /> */}
      </div>
    </div>
  )
}
