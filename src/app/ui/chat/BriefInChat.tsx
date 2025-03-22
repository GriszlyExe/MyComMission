"use client";
import { useAppSelector } from "@/states/hook";
import "daisyui";
import { Edit01Icon, CheckmarkCircle01Icon } from "hugeicons-react";
import { XSquareIcon } from "lucide-react";
import { User } from "@/common/model";
import { useState } from "react";
import {
	isCommissionReject as isCommissionReject,
	states,
} from "./commissionState";
import { BriefForm } from "./BriefForm";
import { ProposalForm } from "./ProposalForm";

import React from "react";

const BriefInChat = () => {
	return <div>BriefInChat</div>;
};

export default BriefInChat;
