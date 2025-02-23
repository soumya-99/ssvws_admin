import { useCallback, useMemo, useState, useEffect } from "react";
import { Select, Button } from "antd";
import { useFormik } from "formik"
import * as Yup from "yup"
import { debounce } from "@mui/material"
import TDInputTemplateBr from "../../Components/TDInputTemplateBr"
import { defaultTransferCOGenericFormProps, TRANSFER_CO_PARAMS, fetchBranches, fetchCONamesBranchWise } from "./TranceferCOGenericUtil";
import DialogBox from "../../Components/DialogBox";
import BtnComp from "../../Components/BtnComp";
import axios from "axios";
import { url } from "../../Address/BaseUrl";
import { Message } from "../../Components/Message"
import { useNavigate } from "react-router-dom"
const mcClass = "px-4 pb-5 bg-slate-50 rounded-lg shadow-lg h-auto my-10 mx-32";
const labelClass = "block mb-2 text-sm capitalize font-bold text-slate-800";


const {
    FROM_BRANCH,
    FROM_CO,
    TO_BRANCH,
    TO_CO,
    GROUP_NAME_CODE,
    REMARKS } = TRANSFER_CO_PARAMS;

const TranceferCOGenericForm = (props) => {

    const [toBranchOptions, setToBranchOptions] = useState([]);
    const [toCOOptions, setToCOOptions] = useState([]);
    const [visible3, setVisible3] = useState(() => false)
    const userDetails = JSON.parse(localStorage.getItem("user_details"))
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)


    const { inactiveSearchGroup,
        inactiveFromCO,
        inactiveFromBranch,
        inactiveToCO,
        inactiveToBranch,
        inactiveRemarks,
        allowEditMode,
        receivedData,
        onEditModeUpdateRequest,
        action,
        actionLabel
    } = { ...defaultTransferCOGenericFormProps, ...props };

    const transferCOFormManager = useFormik({
        enableReinitialize: true,
        initialValues: {
            // [FROM_BRANCH.name]: receivedData.from_brn ?? "",
            // [FROM_CO.name]: receivedData.from_co ?? "",
            [TO_BRANCH.name]: receivedData.to_brn ?? "",
            [TO_CO.name]: receivedData.to_co ?? "",
            [GROUP_NAME_CODE.name]: receivedData.group_code ?? "",
            [REMARKS.name]: receivedData.remarks ?? "",
            approved_by : userDetails?.emp_id,
		    modified_by : userDetails?.emp_id,
        },
        validationSchema: Yup.object({
            // [TO_BRANCH.name]: Yup.string().required("Required"),
            // [TO_CO.name]: Yup.string().required("Required"),
            [REMARKS.name]: Yup.string().required("Remarks is Required"),
        }),
        validateOnChange: true
    });

    const getActualFormFiled = useCallback((fieldName) => <input value={transferCOFormManager.values[fieldName]} type="hidden" name={fieldName} />, [transferCOFormManager.values])


    const getEditBox = useCallback((fieldName) => {
        if (allowEditMode
            && Array.isArray(allowEditMode)
            && allowEditMode.length
            && allowEditMode.some((fName) => fName === fieldName)) {
            return <span onClick={() => {
                onEditModeUpdateRequest(fieldName)

            }} style={{ cursor: 'pointer', color: '#888' }}> Edit</span>
        }

        return <></>
    }, [allowEditMode, onEditModeUpdateRequest]);


    const SearchGroupName = useMemo(() => {
        const { group_name } = receivedData;
        if (inactiveSearchGroup && group_name) {
            return <div>
                <label class={labelClass}>Search Group Name or Code </label>
                <span>{group_name}</span>
            </div>
        }

        return <div>

            <label for={GROUP_NAME_CODE.name} class={labelClass}>{GROUP_NAME_CODE.label}{getEditBox(GROUP_NAME_CODE.name)}</label>
            {getActualFormFiled(GROUP_NAME_CODE.name)}
            <Select
                placeholder="Search Name Code or Group"
                label={GROUP_NAME_CODE.label}
            />
        </div>

    }, [inactiveSearchGroup, receivedData, getEditBox, getActualFormFiled]);

    const FromCO = useMemo(() => {
        const { from_co_name, from_co } = receivedData;
        if (inactiveFromCO) {
            return <div title={from_co}><label class={labelClass}>{FROM_CO.label}{getEditBox(FROM_CO.name)}</label><span>{from_co_name}</span></div>
        } else {
            return <div><TDInputTemplateBr
                placeholder="From CO"
                type="text"
                label={FROM_CO.label}
                name={FROM_CO.name}
                mode={1}
            /></div>
        }


    }, [inactiveFromCO, receivedData, getEditBox]);

    const FromBranch = useMemo(() => {
        const { from_brn_name, from_brn } = receivedData;
        if (inactiveFromBranch) {
            return <div title={from_brn}><label class={labelClass}>{FROM_BRANCH.label}{getEditBox(FROM_BRANCH.name)}</label><span>{from_brn_name}</span></div>
        } else {
            return <div><TDInputTemplateBr
                placeholder={FROM_BRANCH.label}
                type="text"
                label={FROM_BRANCH.label}
                name={FROM_BRANCH.name}
                mode={1}
            /></div>
        }


    }, [inactiveFromBranch, receivedData, getEditBox])

    const ToBranch = useMemo(() => {
        const { to_brn_name, to_brn } = receivedData;
        if (inactiveToBranch) {
            return <div title={to_brn}><label class={labelClass}>{TO_BRANCH.label}{getEditBox(TO_BRANCH.name)}</label><span>{to_brn_name}</span></div>
        } else {
            return <div>
                <label for={TO_BRANCH.name} class={labelClass}>Search Branch Name or Code</label>
                {getActualFormFiled(TO_BRANCH.name)}
                <Select
                    value={to_brn_name}
                    showSearch
                    placeholder="Search Branch Name Or Code"
                    label="Search Branch Name Or Code"
                    filterOption={false}
                    onSearch={debounce(async (branch) => {
                        const branchList = await fetchBranches({ branch })
                        setToBranchOptions(branchList);
                    })}
                    onChange={(val) => {
                        transferCOFormManager.setFieldValue(TO_BRANCH.name, val)
                        transferCOFormManager.setFieldValue(TO_CO.name, '');
                    }}
                    options={toBranchOptions}
                />
            </div>
        }


    }, [inactiveToBranch, receivedData, getEditBox, getActualFormFiled, toBranchOptions, transferCOFormManager]);

    const ToCO = useMemo(() => {
        const { to_co_name, to_co } = receivedData;
        if (inactiveToCO) {
            return <div title={to_co}><label class={labelClass}>{TO_CO.label}{getEditBox(TO_CO.name)}</label><span>{to_co_name}</span></div>
        } else {
            return <div>
                <label for={TO_CO.name} class={labelClass}>Set To CO</label>
                {getActualFormFiled(TO_CO.name)}
                <Select
                    placeholder="Search CO"
                    label="Search CO"
                    filterOption={true}
                    onChange={(val) => { transferCOFormManager.setFieldValue(TO_CO.name, val) }}
                    options={toCOOptions}
                />
            </div>
        }


    }, [inactiveToCO, receivedData, getEditBox, transferCOFormManager, getActualFormFiled, toCOOptions]);

    const Remarks = useMemo(() => {
        const { remarks } = receivedData;
        if (inactiveRemarks) {
            return <div><label class={labelClass}>{REMARKS.label}{getEditBox(REMARKS.name)}</label><span>{remarks}</span></div>
        } else {
            return <div>

<label class="block mb-2 text-sm capitalize font-bold text-slate-800">Remarks </label>
                <textarea style={{width:'100%', borderRadius:5}}
                    placeholder={REMARKS.label}
                    type="text"
                    // label={REMARKS.label}
                    name={REMARKS.name}
                    value={transferCOFormManager.values[REMARKS.name]}
                    onChange={transferCOFormManager.handleChange}

                />
                
                </div>
        }


    }, [inactiveRemarks, receivedData, getEditBox, transferCOFormManager.values, transferCOFormManager.handleChange]);

    useEffect(() => {
        const loadCO = async () => {
            const colist = await fetchCONamesBranchWise({ branch_code: transferCOFormManager.values[TO_BRANCH.name] })
            setToCOOptions(colist);
        }
        loadCO();
    }, [transferCOFormManager.values]);

    // const transferCOSubmit = useCallback((e) => {
    //     setVisible3(false)
    //     e.preventDefault();

    //     transferCOFormManager.validateForm().then(() => {
    //         action(transferCOFormManager.values);
    //     }).catch((error) => {
    //         console.error('Error', error)
    //     })
    // }, [transferCOFormManager, action])

    const transferCOSubmit = useCallback(async (e) => {
        e.preventDefault(); // Prevent default form submission
        setVisible3(false); // Hide modal or UI component
    
        setLoading(true); // Optional: Show loading state
        
        console.log("transfer_co_view_all_details", transferCOFormManager.values);
        try {
            await transferCOFormManager.validateForm(); // Validate form first
            const creds = transferCOFormManager.values; // Extract form values
    
            const res = await axios.post(`${url}/approve_co_trans_dt`, creds);
    
            // console.log("transfer_co_view_all_details", res?.data?.msg);
            Message("success", "Updated successfully.");
    
            // Navigate back to the previous page
            // navigate(-1);
            navigate(`/homebm/trancefercofromapprove-unic/`);
        } catch (err) {
            console.error("Error while updating", err);
            Message("error", "Some error occurred while updating.");
        } finally {
            setLoading(false); // Reset loading state
        }
    }, [transferCOFormManager, url, navigate]);
    
    

    return  <div className="card bg-white border-2 p-5 mx-16 shadow-lg rounded-3xl surface-border border-round surface-ground flex-auto font-medium">
        {/* // <main className={mcClass}></main> */}
        {/* <div className="flex flex-row gap-3 mt-0  py-3 rounded-xl">
            <div className="text-3xl text-slate-700 font-bold">
                Approve Transfer CO
            </div>
        </div> */}
        <form>
            <div className="grid grid-cols-3 gap-5 mt-5">
                {SearchGroupName}
                {FromCO}
                {FromBranch}
            </div>
            <div className="grid grid-cols-3 gap-5 mt-5">
                {ToBranch}
                {ToCO}
            </div>
            <div className="grid grid-cols-1 gap-0 mt-5">
                {Remarks}
                {transferCOFormManager.errors[REMARKS.name] && (
                <div style={{ color: "red", fontSize:12 }}>
                    {transferCOFormManager.errors[REMARKS.name]}
                </div>
            )}
                
            </div>
            <div className="mt-0">
                {/* <Button onClick={transferCOSubmit}>{actionLabel ?? 'Submit'}</Button> */}
                {/* <BtnComp
								mode="B"
								showUpdateAndReset={false}
								showForward={true}
								onForwardApplication={() => setVisible3(true)}
							/> */}
                
                <BtnComp
  mode="B"
  showUpdateAndReset={false}
  showForward={true}
  onForwardApplication={() => {
    if (transferCOFormManager.errors[REMARKS.name]) {
      // Show validation error before opening dialog
      transferCOFormManager.setTouched({ [REMARKS.name]: true });
    } else {
      setVisible3(true); // Open dialog only if no error
    }
  }}
/>

<DialogBox
  flag={4}
  visible={visible3}
  onPress={() => setVisible3(!visible3)} // Close on clicking the background
  onPressYes={(e) => {
    transferCOSubmit(e); // Call function when "Yes" is clicked
    setVisible3(false); // Close dialog
  }}
  onPressNo={() => setVisible3(false)} // Close on No
/>
                
            </div>
        </form>

    </div>
}
export default TranceferCOGenericForm;

