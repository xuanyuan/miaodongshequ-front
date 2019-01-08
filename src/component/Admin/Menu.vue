<template>
  <el-row class="menuBox">
    <el-col :span="12">
      <el-form ref="form"
               :model="form"
               :rules="rules"
               label-width="80px">
        <el-form-item label="你是谁"
                      prop="name">
          <el-radio-group v-model="form.name">
            <el-radio v-for="consumer in consumers"
                      :label="consumer"
                      :key="consumer">{{consumer}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="荤菜"
                      prop="checkedMeat">
          <el-checkbox-group v-model="form.checkedMeat">
            <el-checkbox v-for="meat in meats"
                         :label="meat"
                         :key="meat">{{meat}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="素菜"
                      prop="checkedVegetable">
          <el-checkbox-group v-model="form.checkedVegetable">
            <el-checkbox v-for="vegetable in vegetables"
                         :label="vegetable"
                         :key="vegetable">{{vegetable}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="主食"
                      prop="food">
          <el-radio-group v-model="form.food">
            <el-radio label="馒头"></el-radio>
            <el-radio label="米饭"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="在哪吃"
                      prop="place">
          <el-radio-group v-model="form.place">
            <el-radio label="食堂"></el-radio>
            <el-radio label="带回"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     :loading="loading"
                     @click="submitForm('form')">立即下单</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="12"
            style="text-align: center;">
      <img src="../../assets/images/alipay.jpg"
           style="width:300px;"
           alt="">
      <img src="../../assets/images/weixinpay.jpg"
           style="width:300px;"
           alt="">
      <div class="text-info">{{shoppingcart}}</div>
      <div class="text-danger">{{message}}</div>
    </el-col>
  </el-row>

</template>
<script>
const MEATS = "炸火腿片，炒猪头肉，炸腊肠，鱼香肉丝，宫保鸡丁，锅包肉，香菇肉片";
const VEGETABLES = "炖云豆，炸耦合，炒豆皮，炒杏鲍菇，菠菜鸡蛋，炒绿豆芽，炖白菜，炒千叶豆腐，炒蒜苔，土豆丝";
const CONSUMERS = "张友锰，田宝磊，王日超，李增凡，江荣展，刘海良，张佃君，王亚婷，张星琳，牟江辉，霍太宇，刘珈羽，朱佰泽，解宗正，王文廷，唐培超"
const consumers = CONSUMERS.split("，");
const meats = MEATS.split("，");
const vegetables = VEGETABLES.split("，");
export default {
  data() {
    return {
      form: {
        name: '',
        food: '',
        place: '',
        checkedVegetable: [],
        checkedMeat: []
      },
      rules: {
        name: [
          { required: true, message: '请让我知道您是谁', trigger: 'change' },
        ],
        food: [
          { required: true, message: '请选择主食', trigger: 'change' }
        ],
        place: [
          { required: true, message: '请选择地点', trigger: 'change' }
        ]
      },
      checkAllMeat: false,
      checkAllVegetable: false,
      meats: meats,
      vegetables: vegetables,
      consumers: consumers,
      message: '',
      loading: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        let form = this.form;
        if (valid) {
          if ((form.checkedVegetable.length === 0 && form.checkedMeat.length === 0)) {
            this.$message({
              message: '您不选个菜？',
              type: 'warning'
            });
            return false;
          }
          const meatCount = form.checkedMeat.length;
          const vegetableCount = form.checkedVegetable.length;
          const menus = [...form.checkedMeat, ...form.checkedVegetable].join(',');

          let cost = 0;
          if (meatCount === 1 && vegetableCount === 2) {
            cost = 8;
          } else if (meatCount === 0 && vegetableCount === 3) {
            cost = 7;
          } else if (meatCount === 1 && vegetableCount === 3) {
            cost = 9;
          } else if (meatCount === 2 && vegetableCount === 2) {
            // 两荤两素10块
            cost = 10;
          } else {
            this.message = '这种搭配我也不知道价格';
          }

          if (cost != 0) {
            this.message = `${meatCount}荤${vegetableCount}素${cost}块`;
          }

          (async () => {
            this.loading = true;
            try {
              const res = await fetch("/food/order", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  name: form.name,
                  menus,
                  food: form.food,
                  place: form.place,
                  meatCount,
                  vegetableCount,
                  cost
                })
              });
              let body = await res.json();
              if (!body.error) {
                this.$message({
                  message: body.message,
                  type: 'success'
                });
              } else {
                this.$message.error('订餐失败');
              }
            } catch (error) {
              this.$message.error(error.message);
            }
            this.loading = false;
          })()
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.message = "";
      this.loading = false;
    }
  },
  computed: {
    // 计算属性的 getter
    shoppingcart: function() {
      // `this` 指向 vm 实例
      return [...this.form.checkedMeat, ...this.form.checkedVegetable].join(",") + "+" + this.form.food;
    }
  },
  mounted() {
    (async () => {
      const res = await fetch("/food/order", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(res);
    })();
  }
};
</script>

<style lang="scss" scoped>
.menuBox {
  background: #fff;
  border-radius: 5px;
  padding: 10px;
  height: 100%;
}
.text-danger {
  font-size: 20px;
  color: red;
}
.text-info {
  font-size: 20px;
  color: #409eff;
}
.el-radio {
  margin-left: 30px;
  padding-bottom: 10px;
}
.el-checkbox {
  margin-left: 30px;
}
</style>