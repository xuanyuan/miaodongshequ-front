<template>
  <el-row class="menuBox">
    <el-col :span="12">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="你是谁" prop="name">
          <el-radio-group v-model="form.name">
            <el-radio v-for="consumer in consumers" :label="consumer" :key="consumer">{{consumer}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="荤菜" prop="checkedMeat">
          <el-checkbox-group v-model="form.checkedMeat">
            <el-checkbox v-for="meat in meats" :label="meat" :key="meat">{{meat}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="素菜" prop="checkedVegetable">
          <el-checkbox-group v-model="form.checkedVegetable">
            <el-checkbox v-for="vegetable in vegetables" :label="vegetable" :key="vegetable">{{vegetable}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="主食" prop="food">
          <el-radio-group v-model="form.food">
            <el-radio label="馒头"></el-radio>
            <el-radio label="米饭"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="在哪吃" prop="place">
          <el-radio-group v-model="form.place">
            <el-radio label="食堂"></el-radio>
            <el-radio label="带回"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">立即下单</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="12" style="text-align: center;">
      <img src="../../assets/images/weixin.jpg" alt="">
      <div class="text-danger">{{message}}</div>
    </el-col>
  </el-row>

</template>
<script>
const consumers = ['张三', '李四', '王五'];
const meats = ['上海', '北京', '广州', '深圳'];
const vegetables = ['3333', '12323'];
export default {
  data () {
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
      message: ''
    };
  },
  methods: {
    submitForm (formName) {
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
          let cost = 0
          if (meatCount === 1 && vegetableCount === 2) {
            cost = 8;
            this.message = `${meatCount}荤${vegetableCount}素${cost}块`;
          } else if (meatCount === 0 && vegetableCount === 3) {
            cost = 7;
            this.message = `${meatCount}荤${vegetableCount}素${cost}块`;
          } else if (meatCount === 1 && vegetableCount === 3) {
            cost = 9;
            this.message = `${meatCount}荤${vegetableCount}素${cost}块`;
          } else {
            this.message = '请询问老板';
          }
          (async () => {
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
            if (!res) {
              this.$message.error('错了哦，这是一条错误消息');
              return;
            }
            let body = await res.json();
            if (!body.error) {
              this.$message({
                message: body.message,
                type: 'success'
              });
            } else {
              this.$message.error('订餐失败');
            }
            console.log(form, body);
          })()
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
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
</style>