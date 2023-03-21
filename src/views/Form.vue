<script setup lang="ts">
import { ref } from 'vue'
import uuFieldset  from '@/components/Fieldset.vue'
import uuCheckbox  from '@/components/Checkbox.vue'
import uuRadio  from '@/components/Radio.vue'
import uuInput  from '@/components/Input.vue'

// checkbox
const checkbox01 = ref(false) // Single Checkbox Default checked
const checkbox02 = ref(['check01']) // Array Checkbox Default checked
// Array Checkbox with for
const checkbox03 = ref([1]) // Default checked
const checkboxGroup = ref([
  { label: 'Array Checkbox01', value: 0 },
  { label: 'Array Checkbox02', value: 1 },
  { label: 'Array Checkbox03', value: 2, disabled: true},
])

// radio
const radio01 = ref('Radio01') // Default checked
const radio02 = ref(1) // Default checked
const radioGroup = ref([
  { label: 'Radio01' },
  { label: 'Radio02' },
  { label: 'Radio03', disabled: true },
])

// input
const input01 = ref('')
const input02 = ref('')
const inputGroup = ref([
  { 
    inputModel: '', 
    type: 'text', 
    label: 'ID', 
    placeholder: '아이디는 6자 이상 입력',
    minLength: 4,
    maxLength: 10,
    pattern: '^([a-z0-9_]){6,50}$',
    required: true,
    error: false, 
    errorMessage: '아이디를 영문소문자, 영문+숫자로 6자이상 입력해주세요.'
  },
  { 
    inputModel: '', 
    type: 'password', 
    label: 'Password', 
    placeholder: '비밀번호 입력',
    minLength: 4,
    maxLength: 8,
    pattern: '/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&()-_=+]).{8,16}$/',
    error: false, 
    errorMessage: '비밀번호는 영문+숫자 4~8자리로 입력해주세요.'
  },
  { 
    inputModel: '010', 
    type: 'number', 
    label: '휴대폰번호', 
    placeholder: '휴대폰번호 입력', 
    pattern: '[0-9]{11}',
    maxLength: 11,
    error: false, 
    errorMessage: '휴대폰번호를 올바르게 입력해주세요.' 
  }
])

function changeEvent(value : string | boolean | []){
  console.log(value)
}
function inputEvent(value: string){
  console.log(value)
}
</script>
<template>
  <section class="section">
    <h3>Checkbox</h3>
    <form>
      <uu-checkbox
        v-model="checkbox01"
        label="Single Checkbox"
        value="single"
        @change="changeEvent"
      />
    </form>
    <!-- result -->
    <br>
    <div>Boolean 체크 값: {{ checkbox01 }}</div>
    <br>
    <!-- // result -->
    <form>
      <uu-fieldset legend="Array Checkbox">
        <uu-checkbox
          v-model="checkbox02"
          label="checked"
          value="check01"
          @change="changeEvent"
        />
        <uu-checkbox
          v-model="checkbox02"
          value="check02"
          hide-label
          @change="changeEvent"
        >
          label 넣기
        </uu-checkbox>
        <uu-checkbox
          v-model="checkbox02"
          label="disabled"
          value="check03"
          disabled
          @change="changeEvent"
        />
      </uu-fieldset>
    </form>
    <!-- result -->
    <br>
    <div>Array 체크 값: {{ checkbox02 }}</div>
    <br>
    <!-- // result -->
    <form>
      <uu-fieldset legend="Array Checkbox with for">
        <uu-checkbox
          v-for="(item, index) in checkboxGroup"
          :key="index"
          v-model="checkbox03"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
          @change="changeEvent"
        />
      </uu-fieldset>
    </form>
    <!-- result -->
    <br>
    <div>Array 체크 값: {{ checkbox03 }}</div>
    <br>
    <!-- // result -->
  </section>
  <section class="section">
    <h3>Radio</h3>
    <div>
      <form>
        <uu-fieldset
          legend="Radio"
          hide-legend
        >
          <uu-radio
            v-model="radio01"
            label="Radio01"
            value="Radio01"
            @change="changeEvent"
          />
          <uu-radio
            v-model="radio01"
            value="Radio02"
            @change="changeEvent"
          >
            label 넣기
          </uu-radio>
          <uu-radio
            v-model="radio01"
            label="Radio03"
            value="Radio03"
            disabled
            @change="changeEvent"
          />
        </uu-fieldset>
      </form>
      <!-- result -->
      <br>
      <div>체크 값: {{ radio01 }}</div>
      <br>
      <!-- // result -->
      <form>
        <uu-fieldset
          legend="Radio with for"
        >
          <uu-radio
            v-for="(item, index) in radioGroup"
            :key="index"
            v-model="radio02"
            :label="item.label"
            :value="index"
            :disabled="item.disabled"
            @change="changeEvent"
          />
        </uu-fieldset>
      </form>
      <!-- result -->
      <br>
      <div>체크 값: {{ radio02 }}</div>
      <!-- // result -->
    </div>
  </section>
  <section class="section">
    <h3>Input</h3>
    <div>
      <form>
        <uu-fieldset
          legend="Input"
          hide-legend
        >
          <uu-input
            v-model="input01"
            label="이름"
            placeholder="이름을 입력해주세요."
            :max-length="3"
            :error="input01 === ''? true:false"
            error-message="error case"
            @input="inputEvent"
          />
          {{ input01 }}
          <uu-input
            v-model="input02"
            type="number"
            label="나이"
            :max-length="3"
            placeholder="나이를 입력해주세요."
            @input="inputEvent"
          />
          {{ input02 }}
        </uu-fieldset>
      </form>
      <br>
      <form>
        <uu-fieldset
          legend="Input valid"
        >
          <uu-input
            v-for="(item, index) in inputGroup"
            :key="index"
            v-model="item.inputModel"
            v-model:error="item.error"
            :type="item.type"
            :label="item.label"
            :placeholder="item.placeholder"
            :error-message="item.errorMessage"
            :max-length="item.maxLength"
            :pattern="item.pattern"
            @input="inputEvent"
          />
        </uu-fieldset>
      </form>
    </div>
  </section>
</template>

<style>
</style>
