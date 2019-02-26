<template>
  <el-row :gutter="10">
    <el-col :xs="24"
            :sm="24"
            :md="12"
            :lg="12">
      <el-table :data="tableDataBack"
                border
                show-summary
                :summary-method="getSummaries"
                :row-class-name="tableRowClassName"
                style="width: 100%">
        <el-table-column type="index"
                         label="序号"
                         width="50">
        </el-table-column>
        <el-table-column prop="username"
                         label="姓名"
                         width="70">
        </el-table-column>
        <el-table-column prop="no"
                         label="编号"
                         width="50">
        </el-table-column>
        <el-table-column prop="menus"
                         label="菜品"
                         width="290">
        </el-table-column>
        <el-table-column prop="food"
                         label="主食"
                         sortable
                         width="80">
        </el-table-column>
        <el-table-column prop="place"
                         label="地点"
                         width="60">
        </el-table-column>
        <el-table-column prop="cost"
                         label="花销"
                         width="60">
        </el-table-column>
        <el-table-column prop="isPay"
                         sortable
                         width="80"
                         label="买单">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="primary"
                       v-show="scope.row.isPay === 0"
                       @click="pay(scope.$index, scope.row)">结账</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :xs="24"
            :sm="24"
            :md="12"
            :lg="12">
      <el-table :data="tableDataCanteen"
                border
                show-summary
                :summary-method="getSummaries"
                :row-class-name="tableRowClassName"
                style="width: 100%">
        <el-table-column type="index"
                         label="序号"
                         width="50">
        </el-table-column>
        <el-table-column prop="username"
                         label="姓名"
                         width="70">
        </el-table-column>
        <el-table-column prop="no"
                         label="编号"
                         width="50">
        </el-table-column>
        <el-table-column prop="menus"
                         label="菜品"
                         width="290">
        </el-table-column>
        <el-table-column prop="food"
                         label="主食"
                         sortable
                         width="80">
        </el-table-column>
        <el-table-column prop="place"
                         label="地点"
                         width="60">
        </el-table-column>
        <el-table-column prop="cost"
                         label="花销"
                         width="60">
        </el-table-column>
        <el-table-column prop="isPay"
                         sortable
                         width="80"
                         label="买单">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="primary"
                       v-show="scope.row.isPay === 0"
                       @click="pay(scope.$index, scope.row)">结账</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>

</template>

  <script>
export default {
  data() {
    return {
      tableDataBack: [],
      tableDataCanteen: []
    }
  },
  methods: {
    async getOrders() {
      try {
        let res = await fetch("/food/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          }
        });
        let body = await res.json();
        this.tableDataBack = body.orders.filter(v => v.place == '带回');
        this.tableDataCanteen = body.orders.filter(v => v.place == '食堂');
      } catch (error) {
        this.$message.error(error.message);
      }
    },
    pay(index, row) {
      (async () => {
        try {
          let res = await fetch("/food/pay", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(row)
          });

          let result = await res.json();
          if (result.message) {
            this.getOrders();
          }
        } catch (error) {
          this.$message.error(error.message);
        }
      })();
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价';
          return;
        }
        if (index === 1) {
          sums[index] = '';
          return;
        }
        const values = data.map(item => Number(item[column.property]));

        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = '';
        }
      });
      return sums;
    },
    tableRowClassName({ row, index }) {
      console.log(row);
      if (row.food == '馒头') {
        return 'warning-row'
      }
      return ""
    }
  },
  mounted() {
    this.getOrders();
  }
}
</script>
<style lang="scss">
.el-table .warning-row {
  background: #f56c6c;
  color: #ffffff;
}
</style>

