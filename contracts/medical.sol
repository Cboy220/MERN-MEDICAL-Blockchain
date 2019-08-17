pragma solidity ^0.4.24;

/** @title Medical Record. */
contract Medical {
/** @dev Adds a new patient and gets the patient record.
    * @param admissionNo The admission number of the patient.
    * @param name The name of the patient.
    * @param hospital The name of the hospital.
    * @param doctor The name of the patients doctor.
    * @param prescription The name of the patients prescription.
    * @return recordInt Returns the patients record number.
*/

    /** @dev Custom defined types for the patient record. */
    struct Record {
        string admissionNo;
        string name;
        string hospital;
        string doctor;
        string prescription;
        address[] patientsAddress;
    }

    /** @dev Records array */
    Record[] public records;

    mapping(address => bool) public patients;

    address public owner = msg.sender;
    event CreatedPatientEvent();

    /** @dev Restrict read access to contract’s state by other contracts */
    modifier onlyBy(address _account)
    {
        require(
            msg.sender == _account,
            "Sender not authorized."
        );
        _;
    }

    /** @dev Returns the number of patients. */
    function getNumPatients() public view
        //onlyBy(owner)
        returns (uint) {
            return records.length;
    }

    /** @dev Adds a new patient record. */
     function addPatient(string _admissionNo, string _name, string _hospital, string _doctor, string _prescription)  public
     //onlyBy(owner)  //restrict access
     returns (bool) {
        require(bytes(_admissionNo).length > 0, "Admission Number is required"); //check the admission number is entered
        require(bytes(_name).length > 0, "Patient Name is required"); //check the patient name is entered
        require(bytes(_admissionNo).length <= 9, "Admission Length is 9"); //check the admission number length is 9 characters

        Record memory record;
        emit CreatedPatientEvent();  //update the event

        record.admissionNo = _admissionNo;
        record.name = _name;
        record.hospital = _hospital;
        record.doctor = _doctor;
        record.prescription = _prescription;

        records.push(record); //add the patient record

        patients[msg.sender] = true; //update to true
        return true;
    }

    /** @dev Gets the patient record based on the record id. */
    function getPatient(uint recordInt) public view
    //onlyBy(owner)  //restrict access
    returns (uint, string, string, string, string, string, address[]) {
        if (records.length > 0) {  //check the record length is greater than 0
            Record storage p = records[recordInt]; // Get the record
            return (recordInt, p.admissionNo, p.name, p.hospital, p.doctor, p.prescription, p.patientsAddress);  //return the record set based on the id
        }
    }
}
