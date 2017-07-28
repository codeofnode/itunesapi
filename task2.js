
import superagent from 'superagent';

// untill mongoose 5 is not available
mongoose.Promise = global.Promise;

/*
 * A express handler to invite a user
 *
 * Following eslint rules
 *
 */
const inviteUser = async function inviteUser(req, res) {
  const invitationBody = req.body;
  const shopId = req.params.shopId;
  const authUrl = "https://url.to.auth.system.com/invitation";
  const invitationResponse = await superagent.post(authUrl).send(invitationBody);
  if (invitationResponse.status === 201) {
    const createdUser = await User.findOneAndUpdate({
      authId: invitationResponse.body.authId
    }, {
      authId: invitationResponse.body.authId,
      email: invitationBody.email
    }, {
      upsert: true,
      new: true
    }).exec();
    const shop = await Shop.findById(shopId).exec();
    if (err || !shop) {
      return res.status(500).send(err || { message: 'No shop found' });
    }
    if (shop.invitations.indexOf(invitationResponse.body.invitationId)) {
      shop.invitations.push(invitationResponse.body.invitationId);
    }
    // here was the problem.
    // using the id the virtual property of document. or we could cast that with String(_id)
    if (shop.users.indexOf(createdUser.id) === -1) {
      // again don't push the mongoose document instance, rather just the stringified id part
      shop.users.push(createdUser.id);
    }
    await shop.save();
  } else if (invitationResponse.status === 200) {
    res.status(400).json({
      error: true,
      message: 'User already invited to this shop'
    });
    return;
  }
  res.json(invitationResponse);
};

export default inviteUser;
