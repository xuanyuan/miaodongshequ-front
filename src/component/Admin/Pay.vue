<template>
  <el-table :data="tableData"
            border
            show-summary
            style="width: 100%">
    <el-table-column prop="username"
                     label="姓名"
                     width="180">
    </el-table-column>
    <el-table-column prop="cost"
                     label="花销"
                     :summary-method="getSummaries"
                     width="180">
    </el-table-column>
    <el-table-column prop="isPay"
                     sortable
                     label="是否买单">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini"
                   v-show="scope.row.isPay === 0"
                   @click="pay(scope.$index, scope.row)">结账</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

  <script>
export default {
  data() {
    return {
      tableData: []
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
        this.tableData = body.orders;
      } catch (error) {
        this.$message.error(error.message);
      }
    },
    pay(index, row) {
      console.log(row);
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
          sums[index] += ' 元';
        } else {
          sums[index] = 'N/A';
        }
      });

      return sums;
    }
  },
  mounted() {
    this.getOrders();
  }
}
</script>