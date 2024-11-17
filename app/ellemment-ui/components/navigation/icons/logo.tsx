import { Link } from '@remix-run/react';
import React from 'react';

const Logo: React.FC = () => {
    return (
        <Link to="/" className="flex items-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 137.71 135.81"
                className="fill-current text-gray-900 dark:text-gray-100"
            >
                <path d="M83.70583 20.45218c-.003-.009.16318.0204.48546.0861.32227.0657.51636.0848 1.1344.25197.61828.16643 1.121.2436 2.0044.53475.88346.29122 1.6538.49221 2.771.92691 1.1171.4347 2.1071.81687 3.4256 1.4098 1.3185.59291 2.2829 1.0426 3.7304 1.8778 1.4475.83521 2.5994 1.4811 4.1225 2.5748 1.5232 1.0938 2.7727 2.0128 4.3186 3.3711 1.5458 1.3583 2.7945 2.5973 4.3116 4.2165s2.6179 3.0294 3.9668 4.964c1.349 1.9346 2.4501 3.5966 3.562 5.8095s2.1037 4.1494 2.9174 6.5904c.81368 2.4411 1.4776 4.7573 2.0682 7.3389.59066 2.5816.79903 5.0121 1.009 7.7059.21002 2.6938.0594 5.2437-.13667 7.9708-.19604 2.727-.72953 5.3248-1.3371 8.0015-.60755 2.6767-1.5153 5.2522-2.5163 7.7963-1.001 2.5442-2.2876 5.0164-3.6418 7.3542-1.3543 2.3378-3.001 4.6252-4.6513 6.696s-3.6043 4.1113-5.4823 5.8698-4.0673 3.5182-6.0982 4.9345c-2.031 1.4164-4.3783 2.8932-6.4847 3.9527-2.1064 1.0596-4.4484 2.1041-6.516 2.9076-2.0676.80347-4.5709 1.5783-6.5756 2.0396-2.0046.46135-4.2903.92586-6.1492 1.1669-1.8588.24099-4.0268.44599-5.6962.49729-1.6695.0513-3.4462.0317-4.8907.005-1.4444-.0263-3.2219-.23011-4.4112-.37009-1.1894-.14001-2.4878-.338-3.4042-.4908-.91638-.15284-1.9402-.36099-2.565-.49474-.62487-.13374-1.1032-.23372-1.4245-.29746-.3213-.0637-.48558-.0913-.48238-.0802.006.0178.0142.0354.0228.053.009.0173.0195.0346.0315.0515.0115.017.0251.0335.0393.0501.0143.0163.03.0327.0466.0488.0168.0163.0344.0321.0535.0477.019.0158.0388.0313.0596.0466.021.0153.0426.0307.0652.0456.0226.015.0461.0299.0702.0449.0245.0135.049.0294.0746.044.0258.0131.0515.0291.0784.0433.0271.0127.0538.0286.0815.0428.0279.0129.0557.0283.0841.0423.0287.0123.0571.028.0861.0419.0293.0125.0582.0277.0875.0419.0296.0126.0589.0278.0882.0415.0297.0126.059.0278.0884.0416.0297.0126.059.0276.088.0416.0295.0125.0583.0277.087.0416.029.0124.0574.0278.0855.0418.0285.0123.0559.0281.0832.0421.0276.0128.0541.0284.0804.0428.0267.0126.0519.0288.0771.043.0254.0131.0493.029.073.0439.024.0134.0464.0296.0685.0445.022.0149.0431.0302.0633.0455s.0394.0307.0574.0464c.0181.0158.0351.0314.0512.0473.0158.0161.0306.0321.0441.0484.0134.0162.0257.0328.0365.0496.0107.0168.0202.0338.0284.051.008.0175.0147.0346.0195.0524.005.0176.009.0356.01.0541-.003.0167.13827.0682.417.15266.27866.0846 1.0042.25075 1.5539.37111.54969.12057 1.5274.34707 2.3332.474.80577.1269 2.0285.34704 3.073.45315 1.0446.10605 2.4968.25836 3.7608.3195 1.264.0611 2.9229.0901 4.3852.0853 1.4622-.005 3.576-.16328 5.2075-.33272s3.8662-.51057 5.6292-.87195c1.7629-.36132 4.0723-.95319 5.926-1.5259 1.8537-.57264 4.1789-1.4649 6.0812-2.2605 1.9023-.79562 4.4063-2.0635 6.2636-3.1761s4.0621-2.5664 5.8723-3.9016c1.8102-1.3353 4.0175-3.2158 5.6632-4.8439s3.4712-3.6516 4.9807-5.4681 3.1395-4.2469 4.3791-6.2901c1.2397-2.0432 2.6149-4.598 3.5381-6.8126.92321-2.2145 1.8559-4.7511 2.5481-7.0385.69249-2.2874 1.3176-5.0128 1.6524-7.3508.33474-2.3379.57759-4.9104.67449-7.2232.0969-2.3129.007-4.9177-.23313-7.1542-.23958-2.2365-.61149-4.5972-1.0506-6.7171-.43917-2.1199-1.0546-4.3849-1.7593-6.3226-.70466-1.9377-1.4675-3.9236-2.3009-5.6754-.83347-1.7518-1.7521-3.4991-2.6756-5.0435-.9235-1.5443-1.916-3.0503-2.8871-4.3719-.97115-1.3216-1.9533-2.6044-2.9268-3.6952-.97352-1.0908-1.9201-2.108-2.8058-3.0114-.8857-.90346-1.7405-1.7358-2.5431-2.4123-.8026-.67648-1.5024-1.3135-2.149-1.8102-.64656-.49677-1.1953-.92089-1.6386-1.2669-.44331-.34605-.7985-.59773-1.0323-.77053-.23381-.1728-.35087-.26733-.34291-.27898.007-.0118.14064.0625.39074.21631.25006.1539.62655.39279 1.0875.7245.46095.33168 1.0275.7434 1.6921 1.2294.6646.48597 1.4408 1.1034 2.2285 1.8126.78772.70911 1.6941 1.5039 2.5989 2.4057.90485.90179 1.8775 1.9349 2.87 3.0277.99248 1.0928 2.004 2.4173 2.9933 3.7453.98936 1.328 2.0044 2.8856 2.9447 4.4402.94036 1.5546 1.8726 3.3621 2.7211 5.1277.84849 1.7656 1.7342 3.8737 2.3568 5.8603.62269 1.9866 1.285 4.2313 1.7335 6.3708.44845 2.1395.79312 4.5748 1.0391 6.8326.24601 2.2578.2681 4.9618.17353 7.2974-.0946 2.3355-.39866 4.977-.73407 7.3381-.33543 2.3611-1.0757 5.1656-1.7726 7.476-.69703 2.3104-1.7025 5.108-2.7444 7.2953s-2.3636 4.6685-3.614 6.7328c-1.2503 2.0642-3.0413 4.5061-4.5643 6.3416s-3.5566 4.0842-5.2946 5.6478-3.867 3.3386-5.6936 4.6891-4.3253 2.9563-6.251 3.9919c-1.9257 1.0357-4.312 2.1982-6.2318 3.0052-1.9198.80705-4.3533 1.6221-6.2242 2.2051-1.8709.58294-4.2826 1.0824-6.0622 1.4532-1.7796.37077-4.1089.60483-5.7563.78311-1.6474.17827-3.8463.21587-5.3236.22941-1.4772.0136-3.5152-.0587-4.7886-.1742-1.2735-.11546-2.779-.26924-3.8297-.41745s-2.327-.36017-3.137-.51557c-.80995-.15538-1.8448-.36254-2.3981-.49679-.5533-.1342-.97811-.23638-1.2653-.30387-.2872-.0677-.43676-.10088-.43954-.0973-.0101.0143.17206.0796.53713.19307.36512.11337 1.2553.39165 1.9817.56197.72636.17025 1.9675.49504 3.0362.68121 1.0687.1862 2.6484.46762 4.0372.63333 1.3887.1657 3.6285.41278 5.3155.44111 1.687.0283 4.1998.0795 6.1438-.083 1.944-.16253 4.6744-.43567 6.8275-.83207 2.1531-.39643 5.0198-1.0966 7.3293-1.7594 2.3095-.66277 5.5104-1.96 7.8724-3.0253 2.3619-1.0653 5.4879-2.8509 7.8109-4.3306 2.323-1.4798 5.2411-3.8047 7.4323-5.6927 2.1912-1.8881 5.0267-4.9087 6.8809-7.2741s4.0701-5.6054 5.5964-8.2961 3.3675-6.5546 4.3435-9.5564c.97591-3.0017 2.0747-6.8541 2.5919-10.006.51722-3.1521.84166-7.1313.88127-10.338.0397-3.2068-.36892-7.3907-.95421-10.531-.58532-3.1406-1.6274-6.8763-2.6477-9.8641-1.02-2.9879-2.7729-6.6084-4.3104-9.2942s-3.6573-5.7044-5.5085-8.0742-4.4838-5.0826-6.6706-6.9789-4.8858-4.0035-7.2115-5.4838c-2.3256-1.4802-5.1654-3.0773-7.5371-4.1278-2.3716-1.0505-5.0698-2.0455-7.3562-2.7942-2.2864-.74881-5.0675-1.3539-7.2305-1.7153-2.163-.36138-4.5673-.63333-6.5178-.76267-1.9506-.12936-4.107-.12197-5.7978-.0683-1.6909.0536-3.5521.2118-4.9442.39049-1.392.17869-2.7792.40208-3.8532.58917-1.074.18707-2.1227.43572-2.8575.59467-.7349.15864-1.4353.34654-1.8129.43816-.37764.0914-.57492.12959-.57984.11103-.005-.0185.18291-.0919.55145-.21648.36849-.12467 1.0684-.34582 1.7962-.53478.72782-.1888 1.7823-.46841 2.851-.68232 1.0687-.21392 2.4674-.46512 3.8555-.66771 1.3881-.20262 3.2864-.38667 4.9754-.46149 1.689-.0748 3.8912-.10172 5.8416.009 1.9503.11075 4.4076.37056 6.5715.71584 2.1638.3453 5.0315.95423 7.3203 1.6891 2.2888.73489 5.0482 1.7376 7.4224 2.7762 2.3742 1.0387 5.305 2.6675 7.6337 4.1377 2.3286 1.4702 5.1148 3.6243 7.3049 5.512 2.1901 1.8878 4.9266 4.686 6.7814 7.0486s4.043 5.4569 5.5841 8.1362c1.5411 2.6794 3.1414 6.226 4.307 9.1559 1.1655 2.9299 2.1938 7.0622 2.7832 10.198.58937 3.1354 1.0332 7.4655.99827 10.668-.0349 3.2021-.34912 7.2971-.86099 10.445s-1.6162 7.1197-2.586 10.118c-.96985 2.9982-2.8461 7.0215-4.3652 9.71s-3.7778 6.0428-5.6239 8.4072-4.6088 5.1979-6.6973 7.1902-5.4244 4.5398-7.7378 6.0228-5.5287 3.3602-7.8808 4.4312-5.3457 2.2312-7.6107 3.0122c-2.265.78102-5.588 1.5368-7.7318 1.9444-2.1438.40761-4.9582.73246-6.8937.90906-1.9354.17662-4.5421.17349-6.2217.16238-1.6796-.0112-4.0238-.21503-5.407-.3603-1.3832-.14529-3.0177-.39597-4.0822-.55866-1.0645-.16268-2.3659-.45627-3.0897-.59951-.72383-.14333-1.6808-.38964-2.0452-.47317-.36449-.0834-.54729-.11721-.53642-.0977.0216.0383.25995.13799.70175.29483.44171.15703 1.5149.46695 2.3623.69169.84723.22546 2.3214.56797 3.5534.8157 1.2321.24771 3.5224.63175 5.1241.78038 1.6017.14861 4.2491.3763 6.1812.35647 1.9321-.0199 4.8878-.11456 7.1018-.36087 2.214-.24612 5.8374-.78706 8.2498-1.4234 2.4123-.63651 5.7252-1.6722 8.2887-2.6221 2.5633-.95048 6.6527-2.9487 9.168-4.4797 2.5149-1.5317 6.065-3.9896 8.4739-5.9836s5.9456-5.4464 8.0197-7.9892c2.0742-2.5427 4.7451-6.3658 6.4823-9.2971 1.7372-2.9314 3.8426-7.738 4.9884-11.051 1.1458-3.3127 2.4132-8.486 2.8788-12.03.46569-3.5444.74788-8.8821.50011-12.49-.24769-3.6078-1.0186-8.8762-1.9634-12.381-.94517-3.5042-2.7362-8.4784-4.3247-11.725-1.5886-3.2465-4.3034-7.7338-6.4542-10.584-2.1509-2.8506-5.6478-6.6974-8.2539-9.0328s-6.7031-5.4391-9.6317-7.1657c-2.9285-1.7266-7.078-3.7401-10.114-4.9586-3.0363-1.2184-7.7544-2.554-10.82-3.1092-3.0655-.55526-7.3155-1.0516-10.245-1.1358-2.9297-.0842-6.9774.13476-9.6762.45819-2.6988.32344-6.4205 1.0934-8.8113 1.742-2.3908.64853-5.7302 1.7764-7.7563 2.6541-2.0262.87756-4.5873 2.1032-6.2601 3.0262-1.6728.92311-3.8177 2.2567-5.126 3.1513-1.3083.89472-3.0785 2.1793-4.0233 2.9685-.94485.78915-2.0465 1.7064-2.671 2.2815-.62464.5749-1.1032 1.0159-1.4258 1.313-.32251.29723-.7494.73837-.7494.73837l3.1233-2.9052 3.0101-2.4452 3.1472-2.2657 3.6106-2.2701 3.418-1.8358 3.5197-1.6351 3.6104-1.429 4.0797-1.2947 3.7736-.94475 3.8255-.72295 4.274-.5101 3.8978-.20992 3.9069.0214 4.3219.30263 3.8792.54336 3.8426.7731 3.7924.99978 3.7281 1.2215 4.0367 1.6415 3.5354 1.7039 3.4274 1.9107 3.6582 2.3596 3.1393 2.3491 2.994 2.5294 2.8394 2.7004 2.9344 3.1999 2.4569 3.0492 2.2755 3.1866 2.2839 3.6903 1.8398 3.4583 1.6372 3.5601 1.5598 4.0616 1.1587 3.7502.93909 3.8141.71529 3.8659.48874 4.354.19623 3.9373-.0371 3.9459-.3401 4.3979-.56504 3.916-.79671 3.8783-1.0252 3.8269-1.4277 4.1989-1.5215 3.6611-1.7356 3.564-1.9436 3.4542-2.4287 3.7065-2.385 3.1607-2.5662 3.0134-3.0743 3.1758-2.94 2.6447-3.0882 2.4686-3.226 2.2853-3.7701 2.2978-3.4985 1.8438-3.6005 1.6394-4.1427 1.5582-3.7908 1.155-3.8546.93343-4.3852.75915-3.9552.41587-3.9768.18249-3.9849-.0528-4.4738-.37759s11.286 1.5335 15.363 1.067c2.818-.32245 7.4575-1.2377 10.73-2.1076 3.273-.87001 9.1469-3.1469 12.548-5.0011 3.4006-1.8543 8.6082-5.2358 11.919-7.9742 3.3106-2.7384 8.2107-7.992 10.974-11.739 2.7635-3.7469 6.8933-11.159 8.6883-16.342 1.795-5.1821 3.7571-14.12 3.942-20.121.18495-6.0005-.94318-15.882-2.8455-21.797-1.9023-5.9148-6.1954-14.83-9.8765-19.711-3.681-4.8812-10.718-12.013-15.824-15.377-5.1059-3.3636-13.339-7.3323-18.446-8.8012-5.107-1.4688-12.71-2.6176-16.585-2.7262-3.8752-.10859-8.4408.23846-8.7661.27822-.32528.0401-2.3446.23911-4.5709.58352-2.2262.34478-6.605 1.3473-9.7103 2.2857-3.1053.93843-8.3354 3.1888-11.771 4.9814-3.4352 1.7926-8.918 5.6062-11.983 8.2742-3.0649 2.668-7.3701 7.3617-9.9879 10.723-2.6178 3.361-6.0594 9.6481-7.7745 13.548-1.715 3.9-3.798 10.78-4.4665 14.789-.66861 4.0087-1.1746 10.312-1.0692 13.982.10541 3.6697.84317 9.643 1.6054 13.029.76218 3.3859 2.5148 8.9366 3.7928 11.866 1.2779 2.9297 3.5626 7.3019 5.0589 9.7252s4.2565 6.1156 5.8123 7.9771 4.0362 4.3873 5.4106 5.7426c5.6852 3.9881 4.2897 2.3216 9.5145 4.3202 7.5889 2.9813 17.616-.24092 19.336-3.5808 1.7209-3.3399-.50799-12.354-9.6623-21.468-1.3847-1.2713-1.979-1.7497-3.5755-3.5234s-1.9926-2.18-3.5708-4.5328c-1.5782-2.3527-2.0662-3.2155-3.4672-6.1145-1.4009-2.899-1.5719-3.5473-2.4883-6.9733-.91644-3.426-1.0219-4.3462-1.2887-8.15-.26686-3.8039-.35637-4.4696.39429-8.8103.75068-4.3407.76421-5.5188 2.6991-9.8673s2.4773-5.7482 5.481-9.5897 4.163-5.003 7.8955-7.9502c3.7324-2.9472 4.7127-3.6356 9.0586-5.4091s5.7372-2.4071 9.7303-3.0121 5.3981-.8679 8.3044-.74648c2.9063.12144 3.9779.17672 4.2132.20649.23528.0298 1.0724.0273 3.2484.39871 2.176.37142 3.5111.47075 6.7628 1.5461 3.2517 1.0753 5.0458 1.6615 8.783 3.7974s5.639 3.4622 9.0978 6.7716 5.2147 5.2805 7.8006 9.7903c2.586 4.5098 4.0398 7.4296 5.2845 12.675 1.2448 5.2452 1.8175 8.8222 1.48 14.176-.33749 5.3533-1.094 9.2812-2.6784 14.148-1.5844 4.8664-3.3532 8.3224-6.1966 12.355-2.8434 4.0325-5.5919 7.068-9.0826 10.095-3.4908 3.0266-6.8433 5.1387-10.556 7.051.24439-.0343.57637-.11468.99076-.23845.41438-.12377.8491-.2745 1.4126-.50951.56352-.23497 1.1612-.46561 1.854-.81976.69285-.35421 1.4231-.69367 2.2254-1.173.80233-.47934 1.633-.9513 2.5246-1.5601.89209-.60824 1.789-1.2319 2.751-1.9713.96201-.7394 1.8908-1.5278 2.9037-2.3982 1.0128-.87037 1.8962-1.7831 2.8913-2.8321.99518-1.049 1.9152-2.0505 2.8591-3.2736.94387-1.2231 1.8326-2.449 2.7606-3.7919.92801-1.3429 1.6416-2.6725 2.4644-4.1694.82279-1.4969 1.4507-2.9208 2.1408-4.5532.69012-1.6324 1.2056-3.1381 1.7397-4.8831.53405-1.745.91845-3.3138 1.2785-5.1446.36036-1.8308.58736-3.4426.76199-5.3299.17463-1.8872.22207-3.5168.20539-5.4298-.0167-1.913-.15985-3.5291-.36755-5.437-.2077-1.908-.54079-3.4773-.93382-5.3503-.39305-1.873-.90501-3.363-1.4726-5.1729-.5679-1.8098-1.0966-3.0496-1.9059-4.7333-.80939-1.6837-1.4384-3.0043-2.3839-4.5686-.94546-1.5643-1.6724-2.7521-2.7316-4.1776-1.0593-1.4254-1.8441-2.474-2.9922-3.7446s-1.948-2.1849-3.1574-3.2886-2.2329-1.9878-3.4271-2.9769c-1.1942-.98907-2.0323-1.5322-3.2354-2.3456s-1.9212-1.2944-3.1014-1.9339c-1.1802-.63949-2.0634-1.1179-3.1634-1.6473-1.1-.52944-1.9011-.8697-2.9024-1.2945-1.0012-.42487-1.6909-.65248-2.575-.98034-.88406-.32787-1.4356-.47412-2.1844-.7149-.74876-.24101-1.1396-.34246-1.7356-.50831l.00009-.00052" />
            </svg>
        </Link>
    );
};

export default Logo;