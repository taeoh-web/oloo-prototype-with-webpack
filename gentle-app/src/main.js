import GentleUtil from '../common/util';
import GentleServiceInviteMember from '../service/inviteMember';
//export default GentleServiceInviteMember;

$(document).ready(function(){
    GentleUtil.slidePopupInit();
    GentleServiceInviteMember.selectInviteType();
});