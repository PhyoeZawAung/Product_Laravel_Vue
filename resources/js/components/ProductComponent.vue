<template>
  <div class="container my-5">
    <div>
      <div class="row justify-content-end mb-3">
        <div class="col-4">
          <button class="btn btn-primary" @click="create">
            <i class="fas fa-plus-circle"></i> Create
          </button>
        </div>
        <div class="col-4">
          <form @submit.prevent="getData">
            <div class="input-group">
              <input
                type="text"
                v-model="search"
                placeholder="Search"
                class="form-control"
              />
              <div class="input-group-append">
                <button type="submit" class="btn btn-primary">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <div class="card">
            <h4 class="card-header">{{ isEditMode ? "Edit" : "Create" }}</h4>
            <div class="card-body">
              <AlertError :form="product">{{ errorMessage }}</AlertError>
              <form
                @submit.prevent="isEditMode ? update() : store()"
                @keydown="product.onKeydown($event)"
              >
                <div class="form-group mt-3">
                  <label>Name:</label>
                  <input
                    type="text"
                    v-model="product.ProductName"
                    class="form-control"
                  />
                  <span
                    v-if="errors.ProductName"
                    class="text-danger lh-1 fs-6"
                    >{{ errors.ProductName }}</span
                  >
                  <HasError :form="product" field="ProductName" />
                </div>
                <div class="form-group mt-3">
                  <label>Price:</label>
                  <input
                    type="text"
                    v-model="product.price"
                    class="form-control"
                  />
                  <span v-if="errors.price" class="text-danger lh-1 fs-6">{{
                    errors.price
                  }}</span>
                  <HasError :form="product" field="price" />
                </div>
                <Button
                  class="btn btn-primary mt-3"
                  type="submit"
                  :form="product"
                  :disabled="product.busy"
                  ><i class="fas fa-save me-1"></i
                  >{{ isEditMode ? "Update" : "Save" }}</Button
                >
              </form>
            </div>
          </div>
        </div>
        <div class="col-8">
          <table class="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products.data" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.ProductName }}</td>
                <td>{{ product.price }}</td>
                <td>
                  <button class="btn btn-success btn-sm" @click="edit(product)">
                    <i class="fas fa-edit me-1"></i>Edit
                  </button>
                  <button
                    class="btn btn-danger btn-sm"
                    @click="destroy(product.id)"
                  >
                    <i class="fas fa-trash-alt me-1"></i>delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <pagination
            :data="products"
            @pagination-change-page="getData"
          ></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { arrowFunctionExpression } from "@babel/types";
import { isNumber } from "util";
import Form from "vform";

export default {
  data() {
    return {
      search: "",
      isEditMode: false,
      products: {},
      product: new Form({
        id: null,
        ProductName: null,
        price: null,
      }),
      errorMessage: "",
      errors: {
        ProductName: null,
        price: null,
      },
    };
  },
  methods: {
    getData(page = 1) {
      this.$Progress.start();
      let loader = this.$loading.show({
        color: "#0b5ed7",
        width: 50,
        heigth: 50,
      });
      axios
        .get(`/api/product?page=${page}&search=${this.search}`)
        .then((response) => {
          this.products = response.data;
          this.loading = false;
          this.$Progress.finish();
          loader.hide();
        })
        .catch((error) => {
          console.log(error);
          this.$Progress.fail();
          loader.hide();
        });
    },
    create() {
      this.isEditMode = false;
      this.product.errors.clear();
      this.clearErrors();
      this.product.reset();
    },
    store() {
      this.$Progress.start();
      if (this.hasError()) {
        this.$Progress.fail();
        return;
      }
      this.product
        .post("/api/product")
        .then((response) => {
          this.getData();
          this.product.reset();
          this.$Progress.finish();
          this.showToast("Created Successfully");
        })
        .catch((error) => {
          this.$Progress.fail();
          this.errorMessage = error.response.data.message;
        });
    },
    edit(product) {
      this.isEditMode = true;
      this.product.errors.clear();
      this.clearErrors();
      this.product.fill(product);
    },

    update() {
      this.$Progress.start();
      if (this.hasError()) {
        this.$Progress.fail();
        return;
      }
      this.product
        .put(`/api/product/${this.product.id}`)
        .then((response) => {
          this.product.reset();
          this.getData();
          this.showToast("Updated Successfully");
          this.$Progress.finish();
        })
        .catch((error) => {
          this.$Progress.fail();
          this.errorMessage = error.response.data.message;
        });
    },
    showToast(message) {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", this.$swal.stopTimer);
          toast.addEventListener("mouseleave", this.$swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        title: message,
      });
    },
    destroy(id) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (!result.isConfirmed) return;
          this.$Progress.start();
          axios.delete(`/api/product/${id}`).then((response) => {
            this.showToast("Deleted Successfully");
            this.getData();

            this.$Progress.finish();
          });
        });
    },
    hasError() {
      this.clearErrors();
      if (!this.product.ProductName) {
        this.errors.ProductName = "The product name field is required";
      }
      if (!this.product.price) {
        this.errors.price = "The price field is required";
      } else if (isNaN(this.product.price)) {
        this.errors.price = "The price need to be number";
      } else if (this.product.price == 0) {
        this.errors.price = "Need a price";
      }
      if (
        !this.product.price ||
        !this.product.ProductName ||
        isNaN(this.product.price) ||
        this.product.price == 0
      )
        return true;
      return false;
    },
    clearErrors() {
      this.errors.ProductName = this.errors.price = null;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
</style>