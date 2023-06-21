import { Ability } from '@casl/ability'

export const initialAbility = [
  /*{
    action: 'read',
    subject: 'Auth',
  },
  {
    action: 'read',
    subject: 'AclDemo',
  }*/{
    action: 'manage',
    subject: 'all',
  }
]

//  Read ability from localStorage
// 👉 Handles auto fetching previous abilities if already logged in user
// ℹ️ You can update this if you store user abilities to more secure place
// ❗ Anyone can update localStorage so be careful and please update this
const stringifiedUserAbilities = localStorage.getItem('userAbilities')
const existingAbility = null
if(stringifiedUserAbilities!=="undefined"){
  stringifiedUserAbilities ? JSON.parse(stringifiedUserAbilities) : null
}
export default new Ability(existingAbility || initialAbility)
