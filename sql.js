module.exports = {
  userList: {
    query: "select * from odin_user",
  },
  signUp: {
    query: "insert into odin_user set ? on duplicate key update ?",
  },
  diaryList: {
    query:
      "select email , date, account, sum(weapon) as totalweapon, sum(weapon_a) as totalweapon_a, sum(armor) as totalarmor, sum(armor_a) as totalarmor_a, sum(accessory) as totalaccessory, sum(accessory_a) as totalaccessory_a, sum(relic) as totalrelic, sum(relic_a) as totalrelic_a, sum(workmanship) as totalworkmanship, group_concat(etc) as totaletc, dia from odin_data where email = ? group by date DESC, account; ",
  },
  diaryDetail: {
    query: "select * from odin_data where date = ? and email = ?;",
  },
  totalDiaryDetail: {
    query:
      "select email , date, account, sum(weapon) as totalweapon, sum(weapon_a) as totalweapon_a, sum(armor) as totalarmor, sum(armor_a) as totalarmor_a, sum(accessory) as totalaccessory, sum(accessory_a) as totalaccessory_a, sum(relic) as totalrelic, sum(relic_a) as totalrelic_a, sum(workmanship) as totalworkmanship, group_concat(etc) as totaletc, dia from odin_data where date = ? and email = ? group by date DESC, account; ",
  },
  diaryInsert: {
    query: "insert into odin_data set ?;",
  },
  diaryDelete: {
    query: "delete from odin_data where id = ?;",
  },
};
